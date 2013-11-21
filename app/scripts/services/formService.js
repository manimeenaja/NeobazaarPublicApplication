'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Form', ['$resource', '$route', 
    function ($resource, $route) {	
        return $resource('/form');
    }]);