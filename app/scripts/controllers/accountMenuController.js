'use strict';

angular
    .module('Neobazaar')
    .controller(
        'AccountMenuController',
        function($scope, $location, $rootScope, $route, User) {

          $scope.menu = [ {
            'href' : '/#/account',
            'label' : 'I miei annunci'
          }, {
            'href' : '/#/profile',
            'label' : 'Dati anagrafici'
          }, {
            'href' : '/#/support',
            'label' : 'Supporto'
          } ];

          switch ($location.path()) {
          case '/account':
            $scope.menu[0].class = 'active';
            break;
          case '/profile':
            $scope.menu[1].class = 'active';
            break;
          case '/support':
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
              $location.path('account-deleted');
            }, function() {
              $route.reload();
            });
          };

          $scope.getTemplateUrl = function() {
            return '/views/account-menu.html';
          };
        });