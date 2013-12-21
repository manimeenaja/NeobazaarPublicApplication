'use strict';

var services = angular.module('Neobazaar.services');

services.factory('ClassifiedsLoader', [ 'Classified', '$q',
    function(Classified, $q) {
      return function(params) {
        var delay = $q.defer();
        Classified.get(params, function(classified) {
          delay.resolve(classified);
        }, function() {
          delay.reject('Unable to fetch classified');
        });
        return delay.promise;
      };
    } ]);