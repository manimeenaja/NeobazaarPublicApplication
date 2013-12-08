'use strict';

angular.module('Neobazaar').controller('DetailController',
    function($scope, $http, $location, $window, ClassifiedLoader) {
      $scope.resource = new ClassifiedLoader();
      $scope.path = $location.path();
      

      $scope.resource.then(function(response) { 
        console.log(response);
        console.log($scope.resource);
      });

      $scope.back = function() {
        $window.history.back();
      }

    });