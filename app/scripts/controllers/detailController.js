'use strict';

angular.module('Neobazaar')
  .controller('DetailController', function ($scope, $http, $location, $window, ClassifiedLoader) {
	$scope.resource = new ClassifiedLoader();
	$scope.path = $location.path();
	
	$scope.back = function() {
		$window.history.back();
	}

  });