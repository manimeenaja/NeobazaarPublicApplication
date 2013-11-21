'use strict';

angular.module('Neobazaar')
  .controller('SearchSubFormController', function($scope, $rootScope) {
	  var map = $rootScope.categoryMap;
	  
	  $scope.$watch('params.category.value', function() {
			var c = $scope.params.category.value;
			c = undefined == c ? 0 : c;
			c = map[c];
			c = undefined == c ? 'empty' : c;
		  $scope.getTemplateUrl = function() {
			  return '/app/views/searchsubform/' + c + '.html';
		  };
	  });

	  $scope.getTemplateUrl = function() {
		  return '/app/views/searchsubform/empty.html';
	  };
	  
  });
	 