'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('banner', function () {
	  var directiveDefinitionObject =  {
          restrict: 'E',
          priority: 1000,
          scope: true,
          //templateUrl: '/app/views/contact-form.html',
          template: '<div ng-include="getTemplateUrl()"></div>',
          controller: 'BannerController',
          link: function(scope, iElement, iAttrs) {
          }
      };
	  return directiveDefinitionObject;
  });