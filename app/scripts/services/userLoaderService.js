'use strict';

var services = angular.module('Neobazaar.services');

services.factory('UserLoader', [ 'User', '$q', function(User, $q) {
  return function(params) {
    var delay = $q.defer();
    User.get({
      id : params.id
    }, function(user) {
      delay.resolve(user);
    }, function() {
      delay.reject('Unable to fetch user ' + params.id);
    });
    return delay.promise;
  };
} ]);