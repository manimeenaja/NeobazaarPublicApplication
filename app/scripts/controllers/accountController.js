'use strict';

angular.module('Neobazaar')
  .controller('AccountController', function ($scope, $routeParams, $route, $rootScope, $location, $timeout, Classified, ClassifiedsLoader) {
	  if(!$rootScope.logged) {
		  $location.path('/login');
		  return;
	  }
	  
	  $scope.disableEnable = function(item) {
		  Classified.disableEnable({'id':item.hashId}, function() {
			  $route.reload();
		  }, function() {
		  });
	  };
	  
	  $scope.delete = function(item) {
     /*jshint devel:true*/
		  if(confirm('Questo eliminerà l\'annuncio e le immagini associate, l\'azione è irreversibile, procedi?')) {
			  Classified.remove({'id':item.hashId}, function() {
				  $route.reload();
			  }, function() {
			  });
		  }
	  };
	  
	  $scope.touch = function(item) {
		  Classified.touch({'id':item.hashId}, function() {
			  $route.reload();
		  }, function() {
		  });
	  };
		
	  $routeParams.current = 1;
	  $scope.resource = new ClassifiedsLoader($routeParams);
	  $scope.pagination = $scope.resource.paginationData;

	  $scope.getTemplateUrl = function() {
		  return '/views/loggedin/account.html';
	  };
  });