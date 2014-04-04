'use strict';

angular.module('Neobazaar').controller(
    'BreadcrumbsController',
    function($scope, $routeParams, $window) {

      $scope.getBreadcrumbs = function(params) {
        var category = 'category' in params ? params.category : null;
        var purpose = 'purpose' in params ? params.purpose : null;
        var location = 'location' in params ? params.location : null;
        var query = 'query' in params ? params.query : null;
        var page = 'page' in params ? params.page : 1;

        var locationFormatted = null !== location ? location.charAt(0)
            .toUpperCase() +
            location.substr(1) : '';
        var voiceOne = null !== purpose ? locationFormatted + ', ' + purpose
            : locationFormatted;
        var voiceTwo = null !== query ? query + ' in ' + category : category;

        var voiceTwoUrl = null !== query ? '/annunci-' + location + '/' +
            purpose + '/' + page + '?query=' + query : '/annunci-' +
            location + '/' + purpose + '/' + page;
        

        $window.document.title = 'Annunci ' + locationFormatted +  ' ' + 
          voiceOne + ' ' + 
          voiceTwo + ' - ' + 
          $scope.siteConfigs.sitename;

        return [ {
          label : 'Home',
          link : '/'
        }, {
          label : 'Tutti gli annunci',
          link : '/annunci-italia'
        }, {
          label : voiceOne,
          link : '/annunci-' + location + '/' + purpose
        }, {
          label : voiceTwo,
          link : voiceTwoUrl
        }, ];
      };

      $scope.breadcrumbs = $scope.getBreadcrumbs($routeParams);

      $scope.$on('$routeChangeStart', function(next, current) {
        $scope.breadcrumbs = $scope.getBreadcrumbs(current.params);
      });
    });