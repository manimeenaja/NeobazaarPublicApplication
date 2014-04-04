'use strict';

angular.module('Neobazaar')
  .controller('SerpController', function ($scope, $http, $location, $routeParams, ClassifiedsLoader) {
		$scope.filter = {};
		$scope.filter.all = 'Tutti';
		$scope.filter.private = 'Privati';
		$scope.filter.company = 'Aziende';

  $window.document.title = 'Annunci - ' + $scope.siteConfigs.sitename;
		
  var loader = new ClassifiedsLoader($routeParams);
  $scope.resource = loader.then(function(data) {
    $scope.resource = data;
    
    $scope.paginationNext = [{
      label: $scope.resource.paginationData.next.label,
      action: $scope.resource.paginationData.next.onclick
    }];
    
    $scope.paginationPrev = [{
      label: $scope.resource.paginationData.previous.label,
      action: $scope.resource.paginationData.previous.onclick
    }];
  });
 });