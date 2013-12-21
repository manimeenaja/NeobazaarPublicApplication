'use strict';

var services = angular.module('Neobazaar.services');

services.factory('LoggedOutLoader', [ 'LoggedOut', '$q',
    function(LoggedOut, $q) {
      return function() {
        var delay = $q.defer();
        LoggedOut.get({}, function(loggedOut) {
          delay.resolve(loggedOut);
        }, function() {
          delay.reject('Unable to fetch LoggedOut');
        });
        return delay.promise;
      };
    } ]);