'use strict';

angular.module('Neobazaar')
    .controller(
        'LoginController',
        function($scope, $routeParams, $rootScope, $location, $timeout,
            CsrfLoader) {
          if ($rootScope.logged) {
            $scope.getTemplateUrl = function() {
              return '/views/loggedin/login.html';
            };
            $timeout(function() {
              $location.path('account.html');
            }, $rootScope.redirectionDelay);
            return;
          }

          // necessario in caso di aggiornamento del document
          $scope.$watch('logged', function() {
            if ($rootScope.logged) {
              $scope.getTemplateUrl = function() {
                return '/views/loggedin/login.html';
              };
              $timeout(function() {
                $location.path('account.html');
              }, $rootScope.redirectionDelay);
              return;
            }
          });

          $scope.success = function() {
            $rootScope.$emit('loggedIn');
            $scope.getTemplateUrl = function() {
              return '/views/sent/login.html';
            };
            $timeout(function() {
              $location.path('account.html');
            }, $rootScope.redirectionDelay);
          };

          $scope.response = false;
          $scope.error = function(data) {
            $scope.response = false; // reset response
            $scope.response = data;
          };

          $scope.reset = function() {
            $scope.params = {};
          };

          $scope.resource = new CsrfLoader({});
          $scope.resource.then(function(data) {
            if ($scope.params) {
              $scope.params.csrf = data.id;
            }
          });

          $scope.getTemplateUrl = function() {
            return '/views/loggedout/login.html';
          };
        });