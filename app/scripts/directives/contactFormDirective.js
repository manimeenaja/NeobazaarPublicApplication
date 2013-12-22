'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('contactForm', function() {
  var directiveDefinitionObject = {
    restrict : 'E',
    priority : 1000,
    scope : true,
    //templateUrl: '/app/views/contact-form.html',
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'ContactFormController'
  };
  return directiveDefinitionObject;
});