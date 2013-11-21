'use strict';

angular.module('Neobazaar')
  .controller('ActivateClassifiedController', function($scope, $routeParams, $rootScope, $location, $http, Classified) {
	  if($rootScope.logged) {
		  $location.path('account');
		  return;
	  }
//		Il tuo annuncio è stato attivato, ma <strong>non è ancora stato pubblicato</strong>.<br />
//		Abbiamo inviato un'email all'indirizzo che ci hai segnalato con il link da cliccare per l'attivazione.<br />
//		Se non hai ancora ricevuto l'email, controlla anche nella cartella dello spam.<br />

	  $scope.data = null;
	  $scope.activateClassified = function() {
		  Classified.activation({'id':$routeParams.id}, function(data) {
			  $scope.data = data;
		  }, function(data) {
			  $scope.data = data.data;
		  });
	  }
	  $scope.activateClassified();
	  
	  
	$scope.getTemplateUrl = function() {
		return '/app/views/loggedout/activate-classified.html';
	}; 
});
	 