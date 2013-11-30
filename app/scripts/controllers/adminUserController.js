'use strict';

angular.module('Neobazaar')
  .controller('AdminUserController', function ($scope, $routeParams, $route, $rootScope, $location, $timeout, User, UsersLoader) {
	  if(!$rootScope.logged) {
		  $location.path('/login');
		  return;
	  }
	  
	  $scope.disableEnable = function(item) {
		  User.disableEnable({'id':item.hashId}, function(data) {
			  $route.reload();
		  }, function(data) {
			  
		  });
	  }
	  
	  $scope.ban = function(item) {
		  User.ban({'id':item.hashId}, function(data) {
			  $route.reload();
		  }, function(data) {
			  
		  });
	  }
	  
	  $scope.delete = function(item) {
		  if(confirm('Questo eliminerà utente, tutti i suoi annunci e le immagini associate, l\'azione è irreversibile, procedi?')) {
			  User.remove({'id':item.hashId}, function(data) {
				  $route.reload();
			  }, function(data) {
				  
			  });
		  }
	  }
		
	  $scope.resource = new UsersLoader($routeParams);
	  $scope.pagination = $scope.resource.paginationData;

	  $scope.getTemplateUrl =  function() {
		  return '/app/views/loggedin/user.html';
	  }
  });