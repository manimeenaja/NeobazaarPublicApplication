'use strict';

angular.module('Neobazaar').controller(
    'DetailController',
    function($scope, $rootScope, $http, $location, $window, ClassifiedLoader) {
      

      $scope.path = $location.path();
      
      var loader = new ClassifiedLoader();
      $scope.resource = loader.then(function(data) {
        $scope.resource = data;
        
        console.log($location.absUrl());

        $window.document.title = data.data.title + ' - ' +
            ' Neobazaar annunci gratuiti';
        $rootScope.fb = {
          title : $window.document.title,
          image: data.data.image.src,
          url : $location.absUrl(),
        };
        
      });
      
      
      
      
      
      /*
      $scope.resource = new ClassifiedLoader();
      $scope.path = $location.path();

      $scope.resource.then(function(response) {
        
        
        $window.document.title = response.data.title + ' - ' +
            ' Neobazaar annunci gratuiti';
        $rootScope.fb = {
          title : $window.document.title,
          sitename : 'Neobazaar',
          description : 'Neobazaar free classifieds'
        };
        
        
      });*/

      $scope.back = function() {
        $window.history.back();
      };
      
      
      
    });