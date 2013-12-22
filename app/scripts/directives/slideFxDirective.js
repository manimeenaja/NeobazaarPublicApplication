'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('slidefx', function() {
  var directiveDefinitionObject = {
    restrict : 'A',
    link : function(scope, element, attrs) {
      angular.element(element).click(function(e) {
        angular.element(attrs.href).slideToggle('slow', function() {
          // Animation complete.
        });
        e.preventDefault();
      });
    }
  };
  return directiveDefinitionObject;
});