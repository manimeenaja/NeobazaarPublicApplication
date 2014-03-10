'use strict';

angular.module('Neobazaar')
  .controller('AccountController', function ($scope, $routeParams, $route, $rootScope, $location, $timeout, Classified, ClassifiedsLoader) {
	  if(!$rootScope.logged) {
		  $location.path('/login.html');
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
	  

	  $scope.getTemplateUrl = function() {
		  return '/views/loggedin/account.html';
	  };
  });