'use strict';

angular.module('Neobazaar')
  .controller('AdminClassifiedController', function ($scope, $routeParams, $route, $rootScope, $location, $timeout, Classified, ClassifiedsLoader) {
//	  if(!$rootScope.logged) {
//		  $scope.getTemplateUrl =  function() {
//			  return '/app/views/loggedout/account.html';
//		  }
//		  $timeout(function() {
//			  $location.path('/login');
//		  }, $rootScope.redirectionDelay);
//		  return;
//	  }
	  
	  $scope.isAdmin = true;
	  $scope.disableEnable = function(item) {
		  Classified.disableEnable({'id':item.hashId}, function(data) {
			  $route.reload();
		  }, function(data) {
			  
		  });
	  }
	  
	  $scope.delete = function(item) {
		  if(confirm('Questo eliminerà l\'annuncio e le immagini associate, l\'azione è irreversibile, procedi?')) {
			  Classified.remove({'id':item.hashId}, function(data) {
				  $route.reload();
			  }, function(data) {
				  
			  });
		  }
	  }
	  
	  $scope.deleteSelected = function() {
		  if(confirm('Questo eliminerà tutti gli annunci selezionati, procedi?')) {
			  var ids = [];
			  $('.full-check:checked').each(function(i, v) {
				  ids.push($(v).attr('id'));
			  });
			  
			  if(ids.length) { 
				  Classified.remove({'id': 'bulk'}, {'ids':ids}, function(data) {
					  $route.reload();
				  }, function(data) {
				  
				  });
			  }

			  return false;
		  }
	  }
	  
	  $scope.fullCheck = function(e) {
		  $('.full-check').prop('checked', $(e.target).prop('checked'));
	  }
		
	  $routeParams.full = 1;
	  $scope.resource = new ClassifiedsLoader($routeParams);
	  $scope.pagination = $scope.resource.paginationData;
	  
	  $scope.getTemplateUrl =  function() {
		  return '/app/views/loggedin/classifieds.html';
	  }
  });