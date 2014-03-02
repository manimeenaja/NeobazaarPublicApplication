'use strict';

angular
    .module('Neobazaar')
    .controller(
        'AccountMenuController',
        function($scope, $location, $rootScope, $route, User) {

          $scope.menu = [ {
            'href' : '/account.html',
            'label' : 'I miei annunci'
          }, {
            'href' : '/profile.html',
            'label' : 'Dati anagrafici'
          }, {
            'href' : '/support.html',
            'label' : 'Supporto'
          } ];

          switch ($location.path()) {
          case '/account.html':
            $scope.menu[0].class = 'active';
            break;
          case '/profile.html':
            $scope.menu[1].class = 'active';
            break;
          case '/support.html':
            $scope.menu[2].class = 'active';
            break;
          }

          
          $scope.closeAccount = function() {
            /*jshint devel:true*/
            if (!confirm('Questa azione è IRREVERSIBILE: il tuo account sarà chiuso ed i tuoi annunci eliminati! Vuoi procedere?')) {
              return false;
            }

            User.remove({
              'id' : $rootScope.userData.hashId
            }, function() {
              $rootScope.userData = null;
              $location.path('account-deleted.html');
            }, function() {
              $route.reload();
            });
          };

          $scope.getTemplateUrl = function() {
            return '/views/account-menu.html';
          };
        });