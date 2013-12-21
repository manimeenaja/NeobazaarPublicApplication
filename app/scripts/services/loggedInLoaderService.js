'use strict';

var services = angular.module('Neobazaar.services');

services.factory('LoggedInLoader', [ 'LoggedIn', '$q', function(LoggedIn, $q) {
  return function() {
    var delay = $q.defer();
    LoggedIn.get({}, function(loggedIn) {
      delay.resolve(loggedIn);
    }, function() {
      delay.reject('Unable to fetch LoggedIn');
    });
    return delay.promise;
  };
} ]);