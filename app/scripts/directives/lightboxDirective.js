'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('lightbox', function() {
  var directiveDefinitionObject = {
    restrict : 'A',
    link : function(scope, element, attrs) {
      angular.element(element).lightbox(scope.$eval(attrs.directiveName));
    }
  };
  return directiveDefinitionObject;
});