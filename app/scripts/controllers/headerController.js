'use strict';

angular.module('Neobazaar').controller('HeaderController',
    function($scope, $routeParams) {
      $scope.params = $routeParams;

      $scope.heading = 'Descrizione questa pagina';

      $scope.getHeaderTemplateUrl = function() {
        return '/views/header-search.html';
        // return 'location' in $routeParams || 'id' in $routeParams ?
        // '/views/header-search.html' : '/views/header-home.html';
      };

      $scope.$watch('params.location.value', function() {
        $scope.getHeaderTemplateUrl();
      });
    });