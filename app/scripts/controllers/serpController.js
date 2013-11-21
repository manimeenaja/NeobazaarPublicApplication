'use strict';

angular.module('Neobazaar')
  .controller('SerpController', function ($scope, $http, $location, $routeParams, ClassifiedsLoader) {
		$scope.filter = {};
		$scope.filter.all = 'Tutti';
		$scope.filter.private = 'Privati';
		$scope.filter.company = 'Aziende';
		
		$scope.resource = new ClassifiedsLoader($routeParams);
		$scope.pagination = $scope.resource.paginationData;
		
//		$http.get($location.url()).success(function(data, status, headers, config) {
//			$scope.items = data.data;
//			$scope.pagination = data.paginationData;
//			$scope.loading = false;
//			$scope.paginationtag = false;
//		});
  });