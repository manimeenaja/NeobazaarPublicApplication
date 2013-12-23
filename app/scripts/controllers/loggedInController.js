'use strict';

angular.module('Neobazaar').controller(
    'LoggedInController',
    function($scope, $rootScope) {
      $scope.getTemplateUrl = function() {
        return $rootScope.logged ? '/views/loggedin/top-right-buttons.html'
            : '/views/loggedout/top-right-buttons.html';
      };
    });