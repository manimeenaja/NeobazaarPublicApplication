'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Categories', ['$resource', '$route', 
    function ($resource, $route) {	
        return $resource('/data/categories');
    }]);