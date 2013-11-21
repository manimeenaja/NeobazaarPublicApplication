'use strict';

angular.module('Neobazaar')
  .controller('LoginController', function ($scope, $routeParams, $rootScope, $location, $timeout, CsrfLoader) {
	  if($rootScope.logged) {
		  $scope.getTemplateUrl =  function() {
			  return '/app/views/loggedin/login.html';
		  }
		  $timeout(function() {
			  $location.path('account');
		  }, $rootScope.redirectionDelay);
		  return;
	  }
	  
	  // necessario in caso di aggiornamento del document
	  $scope.$watch('logged', function() {
		  if($rootScope.logged) {
			  $scope.getTemplateUrl =  function() {
				  return '/app/views/loggedin/login.html';
			  }
			  $timeout(function() {
				  $location.path('account');
			  }, $rootScope.redirectionDelay);
			  return; 
		  }
	  });
	  
	  $scope.success = function(data, status, headers, config) {
		  $rootScope.$emit('loggedIn');
		  $scope.getTemplateUrl =  function() {
			  return '/app/views/sent/login.html';
		  }
		  $timeout(function() {
			  $location.path('account');
		  }, $rootScope.redirectionDelay);
	  }

	  $scope.response = false; 
	  $scope.error = function(data, status, headers, config) {
		  $scope.response = false; // reset response
		  $scope.response = data;
	  }
	  
	  $scope.reset = function() {
		  $scope.params = {};
	  }

	  $scope.resource = new CsrfLoader({});
	  $scope.resource.then(function(data) {	
		  if($scope.params) {
			  $scope.params.csrf = data.id;
		  }
	  });
	  
	  $scope.getTemplateUrl =  function() {
		  return '/app/views/loggedout/login.html';
	  }
  });