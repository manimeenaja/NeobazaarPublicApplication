'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Locations', [ '$resource',
    function($resource) {
      return $resource('/data/locations');
    } ]);