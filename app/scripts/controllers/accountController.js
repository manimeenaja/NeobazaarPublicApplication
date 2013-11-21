'use strict';

angular.module('Neobazaar')
  .controller('AccountController', function ($scope, $routeParams, $route, $rootScope, $location, $timeout, Classified, ClassifiedsLoader) {
//	  if(!$rootScope.logged) {
//		  $scope.getTemplateUrl =  function() {
//			  return '/app/views/loggedout/account.html';
//		  }
//		  $timeout(function() {
//			  $location.path('/login');
//		  }, $rootScope.redirectionDelay);
//		  return;
//	  }
	  
	  $scope.disableEnable = function(item) {
		  Classified.disableEnable({'id':item.hashId}, function(data) {
			  $route.reload();
		  }, function(data) {
			  
		  });
	  }
	  
	  $scope.delete = function(item) {
		  if(confirm('Questo eliminerà l\'annuncio e le immagini associate, l\'azione è irreversibile, procedi?')) {
			  Classified.remove({'id':item.hashId}, function(data) {
				  $route.reload();
			  }, function(data) {
				  
			  });
		  }
	  }
	  
	  $scope.touch = function(item) {
		  Classified.touch({'id':item.hashId}, function(data) {
			  $route.reload();
		  }, function(data) {
			  
		  });
	  }
		
	  $routeParams.current = 1;
	  $scope.resource = new ClassifiedsLoader($routeParams);
	  $scope.pagination = $scope.resource.paginationData;

	  $scope.getTemplateUrl = function() {
		  return '/app/views/loggedin/account.html';
	  }
  });