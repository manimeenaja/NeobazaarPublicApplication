'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('addSubForm', function() {
  return {
    restrict : 'E',
    rep1ace : true,
    controller : 'AddSubFormController',
    template : '<div ng-include="getTemplateUrl()"></div>'
  };
});