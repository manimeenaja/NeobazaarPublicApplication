'use strict';

angular.module('Neobazaar').controller('DetailController',
    function($scope, $http, $location, $window, ClassifiedLoader) {
      $scope.resource = new ClassifiedLoader();
      $scope.path = $location.path();
      
      $scope.resource.then(function(response) {
        $window.document.title = response.data.title + " - "
            + $window.document.title;
      });

      $scope.back = function() {
        $window.history.back();
      }

    });