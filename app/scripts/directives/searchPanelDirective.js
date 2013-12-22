'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('neoSearchPanel', function() {
  var directiveDefinitionObject = {
    restrict : 'E',
    priority : 1000,
    scope : true,
    //templateUrl: '/app/views/header.html',
    template : '<div ng-include="getHeaderTemplateUrl()"></div>',
    controller : 'SearchPanelController'
  };
  return directiveDefinitionObject;
});