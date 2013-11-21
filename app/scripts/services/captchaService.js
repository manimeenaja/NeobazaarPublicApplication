'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Captcha', ['$resource', '$route', 
    function ($resource, $route) {	
        return $resource('/razor/captcha/:id', { id: '@id'});
    }]);