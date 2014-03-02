'use strict';

angular.module('Neobazaar').controller('ActivateClassifiedController',
    function($scope, $routeParams, $rootScope, $location, $http, Classified) {
      if ($rootScope.logged) {
        $location.path('account.html');
        return;
      }

      $scope.data = null;
      $scope.activateClassified = function() {
        Classified.activation({
          'id' : $routeParams.id
        }, function(data) {
          $scope.data = data;
        }, function(data) {
          $scope.data = data.data;
        });
      };
      $scope.activateClassified();

      $scope.getTemplateUrl = function() {
        return '/views/loggedout/activate-classified.html';
      };
    });
