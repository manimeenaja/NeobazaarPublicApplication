'use strict';

angular.module('Neobazaar')
  .controller('LoggedInController', function ($scope, $rootScope) {
	  $scope.getTemplateUrl = function() {
		  return $rootScope.logged ? 
				'/app/views/loggedin/top-right-buttons.html' : 
				'/app/views/loggedout/top-right-buttons.html';
	  }
  });