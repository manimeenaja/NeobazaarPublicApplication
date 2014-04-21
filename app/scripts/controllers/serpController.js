'use strict';

angular.module('Neobazaar')
  .controller('SerpController', function ($scope, $http, $location, $routeParams, ClassifiedsLoader) {
		$scope.filter = {};
		$scope.filter.all = 'Tutti';
		$scope.filter.private = 'Privati';
		$scope.filter.company = 'Aziende';
		
    var loader = new ClassifiedsLoader($routeParams);
    $scope.resource = loader.then(function(data) {
      $scope.resource = data;
    
      $scope.paginationNext = [{
        label: $scope.resource.paginationData.next.label,
        action: $scope.resource.paginationData.next.onclick
      }];
    
      $scope.paginationPrev = [{
        label: $scope.resource.paginationData.previous.label,
        action: $scope.resource.paginationData.previous.onclick
      }];
    });
    
    var conn = new ab.Session(
        'ws://www.neobazaar.com:8080', 
        function() {            
          conn.subscribe('allCategories', function(topic, data) {
            console.log('New article published to category "' + topic + '" : ' + data.title);
          });
        }, 
        function() {            
          console.warn('WebSocket connection closed');
        }, 
        { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
          'skipSubprotocolCheck': true
        }
    );
    
  });