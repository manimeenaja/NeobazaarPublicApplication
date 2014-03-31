'use strict';

angular.module('Neobazaar').controller(
    'DetailController',
    function($scope, $rootScope, $http, $location, $window, $sce, ClassifiedLoader) {
      $scope.path = $location.path();
      
      var loader = new ClassifiedLoader();
      $scope.resource = loader.then(function(data) {
        $scope.resource = data;
        $scope.htmlSafeContent = $sce.trustAsHtml(data.data.nl2brContent);
        $scope.htmlSafeBreadcrumbs = $sce.trustAsHtml(data.data.breadcrumbs);

        $window.document.title = data.data.title + ' - ' + $scope.siteConfigs.sitename;
        $rootScope.fb.title = $window.document.title;
        $rootScope.fb.type = 'object';
        $rootScope.fb.image = data.data.image.src;
        $rootScope.fb.url = $location.absUrl();
        $rootScope.fb.description = data.data.content;
        $rootScope.fb.sitename = 'Neobazaar annunci gratuiti';
      });

      $scope.back = function() {
        $window.history.back();
      };
});