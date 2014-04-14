'use strict';

angular.module('Neobazaar')
  .controller('ChatController', function ($scope) {

    var conn = new WebSocket('ws://www.neobazaar.com:8080');
    conn.onopen = function(e) {
        console.log("Connection established!");
    };

    conn.onmessage = function(e) {
        var el = angular.element($('.well'));
        el.append('<p>' + e.data + '</p>');
        console.log(e.data);
    };
    
    $scope.msg = '';
    $scope.send = function(e) {

      console.log('send');
      conn.send($scope.msg);
      $scope.msg = '';
    }
    
    
	  $scope.getTemplateUrl = function() {
		  return '/views/chat.html';
	  };
  });