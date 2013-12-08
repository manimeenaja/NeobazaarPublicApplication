'use strict';

angular.module('Neobazaar').controller(
    'DetailController',
    function($scope, $rootScope, $http, $location, $window, ClassifiedLoader) {
      $scope.resource = new ClassifiedLoader();
      $scope.path = $location.path();

      $scope.resource.then(function(response) {
        $window.document.title = response.data.title + " - "
            + $window.document.title;
        $rootScope.fb = {
            title: $window.document.title,
            sitename: 'Neobazaar',
            description: 'Neobazaar free classifieds'
        };
      });

      $scope.back = function() {
        $window.history.back();
      }

    });