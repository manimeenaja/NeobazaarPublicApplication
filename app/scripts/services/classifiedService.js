'use strict';

var services = angular.module('Neobazaar.services');

services.factory('Classified', [ '$resource',
    function($resource) {
      return $resource('/classified/:id', {
        id : '@id'
      }, {
        disableEnable : {
          method : 'PUT',
          params : {
            'action' : 'disableEnable'
          },
          isArray : false
        },
        activation : {
          method : 'PUT',
          params : {
            'action' : 'activation'
          },
          isArray : false
        },
        touch : {
          method : 'PUT',
          params : {
            'action' : 'touch'
          },
          isArray : false
        },
        bulkRemove : {
          method : 'DELETE',
          isArray : false
        }
      });
    } ]);