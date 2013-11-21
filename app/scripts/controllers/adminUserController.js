'use strict';

angular.module('Neobazaar')
  .controller('AdminUserController', function ($scope, $routeParams, $route, $rootScope, $location, $timeout, User, UsersLoader) {
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
		  console.log('disableEnable');
		  console.log(item);
//		  User.disableEnable({'id':item.hashId}, function(data) {
//			  $route.reload();
//		  }, function(data) {
//			  
//		  });
	  }
	  
	  $scope.delete = function(item) {
		  console.log('delete');
		  console.log(item);
//		  User.remove({'id':item.hashId}, function(data) {
//			  $route.reload();
//		  }, function(data) {
//			  
//		  });
	  }
		
	  $scope.resource = new UsersLoader($routeParams);
	  $scope.pagination = $scope.resource.paginationData;

	  $scope.getTemplateUrl =  function() {
		  return '/app/views/loggedin/user.html';
	  }
  });