'use strict';

angular.module('Neobazaar')
  .controller('ChatController', function ($scope, $rootScope) {
    
    var wall = angular.element($('.well'));
    var username = $rootScope.userData.nicename;

    var conn = new WebSocket('ws://www.neobazaar.com:8080');
    conn.onopen = function(e) {
        console.log("Connection established!");
    };

    conn.onmessage = function(e) {
      wall.append('<p><strong>' + username + '</strong>: ' + e.data + '</p>');
        console.log(e.data);
    };
    
    $scope.data = [];
    $scope.send = function() {
      wall.append('<p><strong>' + username + '</strong>: ' + $scope.data.msg + '</p>');
      conn.send($scope.data.msg);
      $scope.data.msg = '';
    };
    
    
	  $scope.getTemplateUrl = function() {
		  return '/views/chat.html';
	  };
  });