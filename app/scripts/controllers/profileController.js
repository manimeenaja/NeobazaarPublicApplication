'use strict';

angular.module('Neobazaar').controller(
    'ProfileController',
    function($scope, $rootScope, $routeParams, $timeout, $http, $location,
        UserLoader) {
      if (!$rootScope.logged) {
        $scope.getTemplateUrl = function() {
          return '/app/views/loggedout/account.html';
        };
        $timeout(function() {
          $location.path('/login');
        }, $rootScope.redirectionDelay);
        return;
      }

      var id = $routeParams && 'id' in $routeParams ? $routeParams.id
          : 'current';
      $scope.response = false;
      $scope.user = new UserLoader({
        'id' : id
      });

      $scope.user.then(function(resource) {
        if (!$scope.params) {
          $scope.reset();
        }
        $scope.params = resource.data;
      });

      $scope.successfull = function(data) {
        $scope.response = false; // reset response
        $scope.response = data;
      };

      $scope.reset = function() {
        $scope.params = {};
      };

      $scope.updateMyText = function() {
        $scope.myText = 'Selected';
      };

      $scope.prepareRequestParams = function(scope) {
        var metadata = [ {
          key : 'cellulare',
          value : 'mobile' in scope.params ? scope.params.mobile : ''
        } ];

        $scope.params.metadata = metadata;
        return $scope.params;
      };

      $scope.isUnchanged = function(params) {
        return angular.equals(params, $scope.params);
      };

      $scope.getTemplateUrl = function() {
        return '/app/views/loggedin/profile.html';
      };
    });