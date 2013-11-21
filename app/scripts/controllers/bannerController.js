'use strict';

angular.module('Neobazaar')
  .controller('BannerController', function ($scope) {
	  $scope.getTemplateUrl = function() {
		  return '/app/views/banner.html';
	  }
  });