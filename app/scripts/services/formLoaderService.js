'use strict';

var services = angular.module('Neobazaar.services');

services.factory('FormLoader', [ 'Form', '$q', function(Form, $q) {
  return function(params) {
    var delay = $q.defer();
    Form.get(params, function(form) {
      delay.resolve(form);
    }, function() {
      delay.reject('Unable to fetch form ' + params.category);
    });
    return delay.promise;
  };
} ]);