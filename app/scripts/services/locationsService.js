'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Locations', ['$resource', '$route', 
    function ($resource, $route) {	
        return $resource('/data/locations');
    }]);