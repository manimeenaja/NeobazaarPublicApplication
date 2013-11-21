'use strict';

var directives = angular.module('Neobazaar.directives');

directives.directive('neoSearchSubForm', function ($compile) {
    return {
        restrict: "E",
        rep1ace: true,
        controller: 'SearchSubFormController',
        template: '<div ng-include="getTemplateUrl()"></div>'
    };
});