'use strict';

var services = angular.module('Neobazaar.services', ['ngResource']);

services.factory('Classified', ['$resource', '$route', 
    function ($resource, $route) {	
        return $resource('/classified/:id', 
        		{ id: '@id'},
        		{ 	disableEnable: {method:'PUT', params:{'action': 'disableEnable'}, isArray:false},
        			activation: {method:'PUT', params:{'action': 'activation'}, isArray:false},
        			touch: {method:'PUT', params:{'action': 'touch'}, isArray:false},
        			bulkRemove: {method:'PUT', params:{'action': 'bulkDelete'}, isArray:true}
        		}
       );
    }]);