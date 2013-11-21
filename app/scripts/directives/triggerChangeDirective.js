'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('triggerChange', function ($sniffer) {
	  var directiveDefinitionObject =  {
			link: function(scope, element, attrs) {
				element.bind('click', function(){
		            $(attrs.triggerChange).trigger($sniffer.hasEvent('input') ? 'input' : 'change');
		        });
			},
		    priority : 1
      };
	  return directiveDefinitionObject;
  });