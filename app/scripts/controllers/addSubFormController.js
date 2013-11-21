'use strict';

angular.module('Neobazaar')
  .controller('AddSubFormController', function($scope, $rootScope, $http) {

	var map = $rootScope.categoryMap;
	  
	$scope.$watch('classified.category.value', function() {
		if(!$scope.classified.category) {
			return;
		}
		
		var c = $scope.classified.category.value;
		c = undefined == c ? 0 : c;
		c = map[c];
		c = undefined == c ? 'empty' : c;
		$scope.getTemplateUrl = function() {
			return '/app/views/addsubform/' + c + '.html';
		};
	});
	  
	$scope.$watch('classified.location.value', function() {
		if(!$scope.classified.location) {
			return;
		}
		
		var c = $scope.classified.location.value;
		c = undefined == c ? 0 : c;
		
		$http.get('/location/' + c + '?action=children')
		.success(function(data, status, headers, config) {
			$rootScope.comune = data[0];
			$rootScope.$emit('subformLoaded');
		})
		.error(function(data, status, headers, config) {

		});
	});

	$scope.getTemplateUrl = function() {
		return '/app/views/empty.html';
	}; 
});
	 