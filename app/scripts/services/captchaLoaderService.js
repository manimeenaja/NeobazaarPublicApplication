'use strict';

var services = angular.module('Neobazaar.services');

services.factory('CaptchaLoader', [ 'Captcha', '$q', function(Captcha, $q) {
  return function(params) {
    var delay = $q.defer();
    Captcha.get({
      id : params.id
    }, function(captcha) {
      delay.resolve(captcha);
    }, function() {
      delay.reject('Unable to fetch Captcha');
    });
    return delay.promise;
  };
} ]);