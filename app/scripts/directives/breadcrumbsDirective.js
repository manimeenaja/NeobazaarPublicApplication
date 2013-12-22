'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('neoBreadcrumbs', function() {
  var directiveDefinitionObject = {
    restrict : 'E',
    priority : 1000,
    scope : true,
    templateUrl : '/app/views/breadcrumbs.html',
    controller : 'BreadcrumbsController'
  };
  return directiveDefinitionObject;
});