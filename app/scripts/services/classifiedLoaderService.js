'use strict';

var services = angular.module('Neobazaar.services');

services.factory('ClassifiedLoader', [
    'Classified',
    '$route',
    '$q',
    function(Classified, $route, $q) {
      return function() {
        var delay = $q.defer();
        Classified.get({
          id : $route.current.params.id
        }, function(classified) {
          delay.resolve(classified);
        },
            function() {
              delay.reject('Unable to fetch classified ' +
                  $route.current.params.id);
            });
        return delay.promise;
      };
    }
  ]);