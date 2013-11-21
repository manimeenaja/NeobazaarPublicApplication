'use strict';

angular.module('Neobazaar')
  .controller('SearchPanelController', function ($scope, $routeParams) {
	  $scope.params = $routeParams;
	  
	  $scope.getHeaderTemplateUrl =  function() {
		  return 'location' in $routeParams ? 
				  '/app/views/search-panel.html' : '/app/views/empty.html';
	  }
	  
	  $scope.$watch('params.location.value', function() {
		  $scope.getHeaderTemplateUrl();
	  });
  });