'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('validation', function($http) {
  var directiveDefinitionObject = {
    link : function($scope, $element, attrs) {
      // Add novalidate to the form element.
      attrs.$set('novalidate', 'novalidate');

      $scope[attrs.validationmodelinit]();

      $scope.elementManager = function(element, data, status) {
        element.find('input, textarea, select').each(
            function(i, v) {
              var el = angular.element(v);
              var name = el.attr('name');

              if (!name) {
                return;
              }

              el.removeClass('ng-invalid').removeClass('ng-valid').addClass(
                  'ng-dirty').addClass('ng-pristine');

              var errors = null;
              if (-1 !== name.indexOf('[')) {
                var newname = '[' + name.replace('[', '][');
                newname = newname.replace(/\[/g, '[\'');
                newname = newname.replace(/\]/g, '\']');
                var s = 'errors = data' + newname + ';';
                try {
                  /*jslint evil: true */
                  eval(s);
                } catch (e) {
                }
              } else {
                errors = data[name];
              }

              // angular element
              var ngel = $scope[attrs.name][name];

              if (!ngel) {
                return;
              }

              if (undefined !== errors && 200 !== status) {
                ngel.$dirty = true;
                ngel.$invalid = true;
                ngel.$valid = false;
                ngel.$pristine = false;
                el.addClass('ng-invalid');
                ngel.messages = [];
                for ( var x in errors) {
                  ngel.messages.push(errors[x]);
                  ngel.$setValidity(x, false);
                }
              } else if (200 !== status) {
                ngel.messages = [];
                ngel.$dirty = false;
                ngel.$invalid = false;
                ngel.$valid = true;
                ngel.$pristine = true;
                el.addClass('ng-valid');
              } else {
                ngel.messages = [];
                ngel.$dirty = false;
                ngel.$invalid = false;
                ngel.$valid = true;
                ngel.$pristine = true;
                el.addClass('ng-valid').removeClass('ng-dirty');
              }
            });
      };

      // $scope[attrs.validationbeforesend]();

      var element = angular.element($element);
      element.on('submit', function(evt) {
        evt.preventDefault();

        var data = null;
        if ('validationrequestadata' in attrs &&
            attrs.validationrequestadata in $scope) {
          data = $scope[attrs.validationrequestadata]($scope);
        } else {
          data = $scope[attrs.validationmodel];
        }

        var method = 'validationmethod' in attrs ? attrs.validationmethod
            : 'post';

        switch (method.toLowerCase()) {
        case 'put':
          $http.put(attrs.action, data).success(
              function(data, status, headers, config) {
                $scope.elementManager(element, data, status);
                if ('validationsuccess' in attrs) {
                  $scope[attrs.validationsuccess]
                      (data, status, headers, config);
                }
              }).error(function(data, status, headers, config) {
            element.removeClass('ng-pristine');
            element.addClass('ng-dirty');
            $scope.elementManager(element, data, status);

            if ('validationerror' in attrs && attrs.validationerror in $scope) {
              $scope[attrs.validationerror](data, status, headers, config);
            }
          });
          break;
        default:
          $http.post(attrs.action, data).success(
              function(data, status, headers, config) {
                $scope.elementManager(element, data, status);
                if ('validationsuccess' in attrs) {
                  $scope[attrs.validationsuccess]
                      (data, status, headers, config);
                }
              }).error(function(data, status, headers, config) {
            element.removeClass('ng-pristine');
            element.addClass('ng-dirty');
            $scope.elementManager(element, data, status);

            if ('validationerror' in attrs && attrs.validationerror in $scope) {
              $scope[attrs.validationerror](data, status, headers, config);
            }
          });
          break;
        }
      });
    }
  };
  return directiveDefinitionObject;
});