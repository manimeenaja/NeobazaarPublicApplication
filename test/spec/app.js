'use strict';

describe('Testing app.js run', function() {
  
  beforeEach(module('Neobazaar'));
  
  var $httpBackend, $rootScope;
  
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $httpBackend.when('GET', '/user/check-logged-in').respond({
      logged : 1,
      data : {
        hashId : 'hash-id',
        name : 'Root',
        surname : 'Toor',
        email : 'user@email.com',
        gender : 'm',
        dateBorn : '01 gennaio 1970',
        nicename : 'Root',
        mobile : '123456789',
        isAdmin : true,
        fullname : 'Root Toor',
        activationaddress : 'activation-address',
        role : 'god',
        state : 1,
        stateFormatted : 'Attivo',
        editAddress : 'edit-address',
        isActive : true,
        isDeactive : false,
        isBanned : false,
        count : 'disabled',
        stateClass : 'success',
        isDeleted : false
      }
    });
    $httpBackend.flush();
  }));
  
  it('test load session', function() {
      expect($rootScope).toMatch(undefined);
    });
});