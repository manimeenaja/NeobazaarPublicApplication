'use strict';

var directives = angular.module('Neobazaar.directives');

//directives.run(function($templateCache) {
//	  $templateCache.put('helloTemplateCached.html', '/app/views/searchform.html');
//});

directives.directive('neoSearchForm', function() {
  var directiveDefinitionObject = {
    restrict : 'E',
    priority : 1000,
    scope : true,
    templateUrl : '/app/views/searchform.html',
    //template: '<div ng-include="getFormTemplateUrl()"></div>',
    controller : 'SearchFormController'
  };
  return directiveDefinitionObject;
});