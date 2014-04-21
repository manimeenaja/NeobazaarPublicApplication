'use strict';

angular.module('Neobazaar')
  .controller('ChatController', function ($scope, $rootScope) {
    
    var wall;
    var username = $rootScope.userData.nicename;
    
    try {
      var conn = new WebSocket('wss://www.neobazaar.com/websocket');
    } catch(e) { alert('no websocket'); }
    
    conn.onopen = function(e) {
      wall = angular.element($('.well'));
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