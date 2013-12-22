'use strict';

angular.module('Neobazaar').controller('PasswordRecoveredController',
    function($scope, $rootScope, $routeParams, $location, User) {
      if ($rootScope.logged) {
        $location.path('/account');
        return;
      }

      $scope.data = false;
      $scope.passwordRecovered = function(id) {
        User.passwordRecovered({
          'id' : id
        }, function(data) {
          $scope.data = data;
        }, function(data) {
          $scope.data = data.data;
        });
      };
      $scope.passwordRecovered($routeParams.id);

      $scope.getTemplateUrl = function() {
        return '/app/views/loggedout/password-recovered.html';
      };
    });