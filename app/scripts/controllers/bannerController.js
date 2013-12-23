'use strict';

angular.module('Neobazaar').controller('BannerController', function($scope) {
  $scope.getTemplateUrl = function() {
    return '/views/banner.html';
  };
});