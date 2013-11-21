'use strict';

angular.module('Neobazaar')
  .controller('PasswordRecoveryController', function ($scope, $rootScope, $routeParams, CsrfLoader) {
	  if($rootScope.logged) {
		  $location.path('/account');
	  }

	  $scope.response = false; 
	  $scope.error = function(data, status, headers, config) {
		  $('#passwordrecovery').unblock();
		  $scope.response = false; // reset response
		  $scope.response = data;
	  }

	  $scope.sent = false;
	  $scope.success = function(data, status, headers, config) {
		  $('#passwordrecovery').unblock();
		  $scope.sent = true;
	  }
	  
	  $scope.reset = function() {
		  $scope.params = {};
		  $scope.params.action = 'passwordrecovery';
	  }
	  
	  $scope.prepareRequestParams = function(scope) {
		  $('#passwordrecovery').block({ message: '<div>Loading</div>' });
		  
		  return $scope.params;
	  }

	  $scope.resource = new CsrfLoader({});
	  $scope.resource.then(function(data) {	
		  if($scope.params) {
			  $scope.params.csrf = data.id;
		  }
	  });
	  
	  $scope.getTemplateUrl =  function() {
		  return $scope.sent ? 
				  '/app/views/loggedout/password-recovery-sent.html' : 
					  '/app/views/loggedout/password-recovery.html';
	  }
  });