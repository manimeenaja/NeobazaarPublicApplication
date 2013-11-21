'use strict';

var services = angular.module('Neobazaar.services');

services.factory('CsrfLoader', ['Csrf', '$q',
    function (Csrf, $q) {
        return function () {
            var delay = $q.defer();
            Csrf.get({}, function (csrf) {
                delay.resolve(csrf);
            }, function () {
                delay.reject('Unable to fetch Csrf');
            });
            return delay.promise;
        };
    }]);