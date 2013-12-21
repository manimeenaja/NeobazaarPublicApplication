'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Form', [ '$resource', function($resource) {
  return $resource('/form');
} ]);