'use strict';

var services = angular.module('Neobazaar.services');

services.factory('LoggedOut', [ '$resource',
    function($resource) {
      return $resource('/user/logout');
    } ]);