'use strict';

angular.module('Neobazaar').controller(
    'BreadcrumbsController',
    function($scope, $routeParams, $window, $rootScope, $location) {

      $scope.getBreadcrumbs = function(params) {
        var category = 'category' in params ? params.category : null;
        var purpose = 'purpose' in params ? params.purpose : null;
        var location = 'location' in params ? params.location : null;
        var query = 'query' in params ? params.query.replace('+', '') : null;
        var page = 'page' in params ? params.page : 1;

        var locationFormatted = null !== location ? location.charAt(0)
            .toUpperCase() +
            location.substr(1) : '';
        var voiceOne = null !== purpose ? locationFormatted + ', ' + purpose
            : locationFormatted;
        voiceOne = voiceOne.replace('-', ' ');
        var voiceTwo = null !== query ? query + ' in ' + category : category;
        voiceTwo = voiceTwo === null ? '' : voiceTwo;

        var voiceTwoUrl = null !== query ? '/annunci-' + location + '/' +
            purpose + '/' + page + '?query=' + query : '/annunci-' +
            location + '/' + purpose + '/' + page;
        

        $window.document.title = 'Annunci ' + voiceOne + ' ' +
          voiceTwo + ' - ' +
          $scope.siteConfigs.sitename;
        
        var description = 
        
        $rootScope.fb.title = $window.document.title;
        $rootScope.fb.type = 'object';
        $rootScope.fb.image = $rootScope.siteConfigs.siteurl + 'img/logo.png';
        $rootScope.fb.url = $location.absUrl();
        $rootScope.fb.description = 'Trova ' + query + ' in ' + locationFormatted + ' ' +
          'su ' + $rootScope.siteConfigs.sitename;
        $rootScope.fb.sitename = $rootScope.siteConfigs.sitename;

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