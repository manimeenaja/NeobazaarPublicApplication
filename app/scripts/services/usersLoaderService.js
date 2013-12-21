'use strict';

var services = angular.module('Neobazaar.services');

services.factory('UsersLoader', [ 'User', '$q', function(User, $q) {
  return function(params) {
    var delay = $q.defer();
    User.get(params, function(user) {
      delay.resolve(user);
    }, function() {
      delay.reject('Unable to fetch user');
    });
    return delay.promise;
  };
} ]);