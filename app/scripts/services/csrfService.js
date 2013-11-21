'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Csrf', ['$resource', '$route', 
    function ($resource, $route) {	
        return $resource('/razor/csrf');
    }]);