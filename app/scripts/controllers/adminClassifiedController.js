'use strict';

angular.module('Neobazaar')
  .controller('AdminClassifiedController', function ($scope, $routeParams, $route, $rootScope, $location, $timeout, Classified, ClassifiedsLoader) {
	  if(!$rootScope.logged) {
		  $scope.getTemplateUrl =  function() {
			  return '/views/loggedout/account.html';
		  };
		  $timeout(function() {
			  $location.path('/login');
		  }, $rootScope.redirectionDelay);
		  return;
	  }
	  
	  $scope.isAdmin = true;
	  $scope.disableEnable = function(item) {
		  Classified.disableEnable({'id':item.hashId}, function() {
			  $route.reload();
		  }, function() {
		  });
	  };
	  
	  $scope.delete = function(item) {
	    /*jshint devel:true*/
		  if(confirm('Questo eliminerà l\'annuncio e le immagini associate, l\'azione è irreversibile, procedi?')) {
			  Classified.remove({'id':item.hashId}, function() {
				  $route.reload();
			  }, function() {
			  });
		  }
	  };
	  
	  $scope.deleteSelected = function() {
		  if(confirm('Questo eliminerà tutti gli annunci selezionati, procedi?')) {
			  var ids = [];
			  angular.element('.full-check:checked').each(function(i, v) {
				  ids.push(angular.element(v).attr('id'));
			  });
			  
			  if(ids.length) {
				  Classified.remove({'id': 'bulk'}, {'ids':ids}, function() {
					  $route.reload();
				  }, function() {
				  });
			  }

			  return false;
		  }
	  };
	  
	  $scope.fullCheck = function(e) {
	    angular.element('.full-check').prop('checked', angular.element(e.target).prop('checked'));
	  };
		
	  $routeParams.full = 1;
	  $scope.resource = new ClassifiedsLoader($routeParams);
	  $scope.pagination = $scope.resource.paginationData;
	  
	  $scope.getTemplateUrl =  function() {
		  return '/views/loggedin/classifieds.html';
	  };
  });