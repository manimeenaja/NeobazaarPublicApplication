'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('loggedIn', function() {
  var directiveDefinitionObject = {
    restrict : 'E',
    priority : 1000,
    scope : true,
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'LoggedInController'
  };
  return directiveDefinitionObject;
});