'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Csrf', [ '$resource', function($resource) {
  return $resource('/razor/csrf');
} ]);