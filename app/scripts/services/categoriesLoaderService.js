'use strict';

var services = angular.module('Neobazaar.services');

services.factory('CategoriesLoader', ['Categories', '$q',
    function (Categories, $q) {
        return function () {
            var delay = $q.defer();
            Categories.get({}, function (categories) {
                delay.resolve(categories);
            }, function () {
                delay.reject('Unable to fetch Categories');
            });
            return delay.promise;
        };
    }]);