'use strict';

angular.module('Neobazaar')
  .controller('AdminUserController', function ($scope, $routeParams, $route, $rootScope, $location, $timeout, User, UsersLoader) {
	  if(!$rootScope.logged) {
		  $location.path('/login.html');
		  return;
	  }
	  
	  $scope.disableEnable = function(item) {
		  User.disableEnable({'id':item.hashId}, function() {
			  $route.reload();
		  }, function() {
		  });
	  };
	  
	  $scope.ban = function(item) {
		  User.ban({'id':item.hashId}, function() {
			  $route.reload();
		  }, function() {
		  });
	  };
	  
	  /*jshint devel:true*/
	  $scope.delete = function(item) {
		  if(confirm('Questo eliminerà utente, tutti i suoi annunci e le immagini associate, l\'azione è irreversibile, procedi?')) {
			  User.remove({'id':item.hashId}, function() {
				  $route.reload();
			  }, function() {
			  });
		  }
	  };
		
    var loader = new UsersLoader($routeParams);
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

	  $scope.getTemplateUrl =  function() {
		  return '/views/loggedin/user.html';
	  };
  });