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
		
	  $scope.resource = new UsersLoader($routeParams);
	  $scope.pagination = $scope.resource.paginationData;

	  $scope.getTemplateUrl =  function() {
		  return '/views/loggedin/user.html';
	  };
  });