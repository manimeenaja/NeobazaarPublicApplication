'use strict';

var services = angular.module('Neobazaar.services');

services.factory('LoggedIn', ['$resource', '$route', 
    function ($resource, $route) {	
        return $resource('/user/check-logged-in');
    }]);