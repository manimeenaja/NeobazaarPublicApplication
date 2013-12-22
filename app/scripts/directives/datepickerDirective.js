'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('datepicker', function() {
  return {
    // Enforce the angularJS default of restricting the directive to
    // attributes only
    restrict : 'A',
    // Always use along with an ng-model
    require : '?ngModel',
    // This method needs to be defined and passed in from the
    // passed in to the directive from the view controller
    scope : {
      select : '&' // Bind the select function we refer to the right scope
    },
    link : function(scope, element, attrs, ngModel) {
      if (!ngModel) {
        return;
      }

      /*global $:false */
      var optionsObj = 'datepickeroptions' in attrs ?
          $.parseJSON(attrs.datepickeroptions) : {};

      optionsObj.dateFormat = 'dd MM yy';
      var updateModel = function(dateTxt) {
        scope.$apply(function() {
          // Call the internal AngularJS helper to
          // update the two way binding
          ngModel.$setViewValue(dateTxt);
        });
      };
      
      /*jshint unused: vars */
      optionsObj.onSelect = function(dateTxt, picker) {
        updateModel(dateTxt);
        if (scope.select) {
          scope.$apply(function() {
            scope.select({
              date : dateTxt
            });
          });
        }
      };

      ngModel.$render = function() {
        // Use the AngularJS internal 'binding-specific' variable
        element.datepicker('setDate', ngModel.$viewValue || '');
        //element.datepicker('option', 'changeMonth', 1);
        //element.datepicker('option', 'changeYear', 1);
        //element.datepicker('option', 'defaultDate', ngModel.$viewValue || element.attr('placeholder') || '');
      };
      element.datepicker(optionsObj);
    }
  };
});