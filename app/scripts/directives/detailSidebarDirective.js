'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('detailSidebar', function() {
  var directiveDefinitionObject = {
    restrict : 'E',
    priority : 1000,
    scope : true,
    templateUrl : '/views/detail-sidebar.html',
    controller : 'DetailSidebarController'
  };
  return directiveDefinitionObject;
});