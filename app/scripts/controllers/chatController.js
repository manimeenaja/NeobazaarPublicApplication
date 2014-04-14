'use strict';

angular.module('Neobazaar')
  .controller('ChatController', function ($scope) {

	  $scope.getTemplateUrl = function() {
		  return '/views/chat.html';
	  };
  });