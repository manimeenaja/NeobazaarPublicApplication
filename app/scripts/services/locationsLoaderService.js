'use strict';

var services = angular.module('Neobazaar.services');

services.factory('LocationsLoader', [ 'Locations', '$q',
    function(Locations, $q) {
      return function() {
        var delay = $q.defer();
        Locations.get({}, function(locations) {
          delay.resolve(locations);
        }, function() {
          delay.reject('Unable to fetch Locations');
        });
        return delay.promise;
      };
    } ]);