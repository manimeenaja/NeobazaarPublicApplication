'use strict';

var services = angular.module('Neobazaar.services');

services.factory('LoggedIn', [ '$resource',
    function($resource) {
      return $resource('/user/check-logged-in');
    } ]);