'use strict';

angular.module('Neobazaar').controller('LogoutController',
    function($scope, $rootScope, $location, $timeout, LoggedOutLoader) {
      if (!$rootScope.logged) {
        $scope.getTemplateUrl = function() {
          return '/views/loggedout/logout.html';
        };
        $timeout(function() {
          $location.path('/');
        }, $rootScope.redirectionDelay);
        return;
      }

      $scope.check = function() {
        $scope.resource = new LoggedOutLoader({});
        $scope.resource.then(function(data) {
          if (data.logout) {
            $rootScope.$emit('loggedOut');
            $timeout(function() {
              $location.path('/');
            }, $rootScope.redirectionDelay);
          }
        });
      };
      $scope.check();

      $scope.getTemplateUrl = function() {
        return '/views/loggedin/logout.html';
      };
    });