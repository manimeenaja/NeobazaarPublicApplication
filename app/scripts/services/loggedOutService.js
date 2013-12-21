'use strict';

var services = angular.module('Neobazaar.services');

services.factory('LoggedOut', [ '$resource', '$route',
    function($resource, $route) {
      return $resource('/user/logout');
    } ]);