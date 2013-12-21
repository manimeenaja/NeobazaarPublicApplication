'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Categories', [ '$resource',
    function($resource) {
      return $resource('/data/categories');
    } ]);