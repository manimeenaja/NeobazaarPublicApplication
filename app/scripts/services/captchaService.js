'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Captcha', [ '$resource',
    function($resource) {
      return $resource('/razor/captcha/:id', {
        id : '@id'
      });
    } ]);