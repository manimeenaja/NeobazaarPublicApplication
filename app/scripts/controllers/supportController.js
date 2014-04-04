'use strict';

/*global $:false */
angular.module('Neobazaar').controller(
    'SupportController',
    function($scope, $rootScope, $timeout, $http, $location, $window, CaptchaLoader) {
      if (!$rootScope.logged) {
        $scope.getTemplateUrl = function() {
          return '/views/loggedout/account.html';
        };
        $timeout(function() {
          $location.path('/login.html');
        }, $rootScope.redirectionDelay);
        return;
      }

      $window.document.title = 'Contattaci - ' + $scope.siteConfigs.sitename;

      $scope.sent = false;
      $scope.dafaultCaptcha = 'loading';
      $scope.resource = new CaptchaLoader({});
      $scope.resource.then(function(data) {
        $scope.dafaultCaptcha = data.id;
        $scope.params.captcha.id = data.id;
      });

      $scope.success = function() {
        $('#support').unblock();
        $scope.sent = true;
        $scope.getTemplateUrl();
      };

      $scope.reset = function() {
        $scope.params = {};
        $scope.params.captcha = {};
        $scope.params.captcha.id = $scope.dafaultCaptcha;
      };

      $scope.response = false;
      $scope.error = function(data) {
        $scope.response = false; // reset response
        $scope.response = data;
        $('html, body').animate({
          scrollTop : 0
        }, 'slow');
        $('#support').unblock();
      };

      $scope.prepareRequestParams = function() {
        $('#support').block({
          message : '<div>Loading</div>'
        });

        return $scope.params;
      };

      $scope.getTemplateUrl = function() {
        return $scope.sent ? '/views/loggedin/support-sent.html'
            : '/views/loggedin/support.html';
      };
    });