'use strict';

angular.module('Neobazaar')
  .controller('ChatController', function ($scope) {

    var conn = new WebSocket('ws://www.neobazaar.com:8080');
    conn.onopen = function(e) {
        console.log("Connection established!");
    };

    conn.onmessage = function(e) {
        console.log(e.data);
    };
    
    
	  $scope.getTemplateUrl = function() {
		  return '/views/chat.html';
	  };
  });