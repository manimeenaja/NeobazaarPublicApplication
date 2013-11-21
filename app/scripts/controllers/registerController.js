'use strict';

angular.module('Neobazaar')
  .controller('RegisterController', function ($scope, $routeParams, $rootScope, $location, $timeout, CsrfLoader) {
	  if($rootScope.logged) {
		  $scope.getTemplateUrl =  function() {
			  return '/app/views/loggedin/register.html';
		  }
		  $timeout(function() {
			  $location.path('account');
		  }, $rootScope.redirectionDelay);
		  return;
	  }

	  $scope.reset = function() {
		  $scope.params = {};
		  $scope.params.agreeterms = 'NO';
	  }

	  $scope.resource = new CsrfLoader({});
	  $scope.resource.then(function(data) {	
		  if($scope.params) {
			  $scope.params.csrf = data.id;
		  }
	  });
	  
	  $scope.prepareRequestParams = function(scope) {
		  $('#register').block({ message: '<div>Loading</div>' });
		  
		  return $scope.params;
	  }

	  $scope.sent = false;
	  $scope.success = function(data, status, headers, config) {
		  $rootScope.$emit('registerUser');
		  $('#register').unblock();
		  $scope.sent = true;
	  }
	  
	  $scope.error = function(data, status, headers, config) {
		  $('#register').unblock();
	  }
	  
	  $scope.getTemplateUrl =  function() {
		  return $scope.sent ? 
				 '/app/views/loggedout/register-sent.html' : 
				'/app/views/loggedout/register.html';
	  }
  });