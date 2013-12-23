'use strict';

angular.module('Neobazaar').controller(
    'UserActivationController',
    function($scope, $routeParams, $route, $rootScope, $location, $timeout,
        User) {
      if ($rootScope.logged) {
        $location.path('/login');
        return;
      }

      $scope.data = false;
      $scope.activate = function(id) {
        User.activate({
          'id' : id
        }, function(data) {
          $scope.data = data;
        }, function(data) {
          $scope.data = data.data;
        });
      };
      $scope.activate($routeParams.id);

      $scope.getTemplateUrl = function() {
        return '/views/loggedout/user-activation.html';
      };
    });