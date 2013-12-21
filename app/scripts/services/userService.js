'use strict';

var services = angular.module('Neobazaar.services');

services.factory('User', [ '$resource', function($resource) {
  return $resource('/user/rest/:id', {
    id : '@id'
  }, {
    activate : {
      method : 'PUT',
      params : {
        'action' : 'activation'
      },
      isArray : false
    },
    passwordRecovered : {
      method : 'PUT',
      params : {
        'action' : 'passwordRecovered'
      },
      isArray : false
    },
    disableEnable : {
      method : 'PUT',
      params : {
        'action' : 'disableEnable'
      },
      isArray : false
    },
    ban : {
      method : 'PUT',
      params : {
        'action' : 'banunban'
      },
      isArray : false
    }
  });
} ]);