'use strict';

angular.module('Neobazaar').controller(
    'SearchFormController',
    function($scope, $rootScope, $location, $routeParams) {

      $scope.params = {
        category : {
          id : 'usato'
        },
        location : {
          value : 'italia'
        },
        purpose : {
          value : 'compravendita'
        },
        query : 'query' in $routeParams ? $routeParams.query : ''
      };

      $scope.$watch('locations', function() {
        $scope.params.location = $rootScope.getCurrentElement(
            $rootScope.locations, 'value', $routeParams.location);
      });

      $scope.$watch('categories', function() {
        $scope.params.category = $rootScope.getCurrentElement(
            $rootScope.categories, 'id', $routeParams.category);
      });

      $scope.$watch('params.category', function() {
        if (null === $scope.params.category) {
          $scope.params.category = {};
          $scope.params.category.id = 'usato';
        }
      });

      $scope.$watch('params.location', function() {
        if (null === $scope.params.location) {
          $scope.params.location = {};
          $scope.params.location.value = 'italia';
        }
      });

      $scope.$watch('params.purpose', function() {
        if (null === $scope.params.purpose) {
          $scope.params.purpose = {};
          $scope.params.purpose.value = 'compravendita';
        }
      });

      var params = {};
      $scope.doSearch = function() {
        for ( var i in $scope.params) {
          /*global $:false */
          if (-1 !== $.inArray(i, [ 'location', 'category', 'purpose' ])) {
            continue;
          }
          params[i] = $scope.params[i];
        }
        $location
            .path(
                'annunci-' + $scope.params.location.value + '/' +
                    $scope.params.purpose.value + '/' +
                    $scope.params.category.id).search(params);
      };

//      $scope.$on('$routeChangeStart', function(next, current) {
//
//      });
    });