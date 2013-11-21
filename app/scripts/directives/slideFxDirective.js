'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('slidefx', function () {
	  var directiveDefinitionObject =  {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$(element).click(function(e) {
					$(attrs.href).slideToggle("slow", function() {
						// Animation complete.
					});
					e.preventDefault();
				});
			}
      };
	  return directiveDefinitionObject;
  });