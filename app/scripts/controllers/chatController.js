'use strict';

angular.module('Neobazaar')
  .controller('ChatController', function ($scope, $rootScope) {

    var conn = new WebSocket('ws://www.neobazaar.com:8080');
    conn.onopen = function(e) {
        console.log("Connection established!");
    };

    conn.onmessage = function(e) {
        var el = angular.element($('.well'));
        el.append('<p><strong>' + $rootScope.userData.nicename + '</strong>: ' + e.data + '</p>');
        console.log(e.data);
    };
    
    $scope.data = [];
    $scope.send = function() {
      conn.send($scope.data.msg);
      $scope.data.msg = '';
    };
    
    
	  $scope.getTemplateUrl = function() {
		  return '/views/chat.html';
	  };
  });