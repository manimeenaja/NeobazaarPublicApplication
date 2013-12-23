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
        hashId : '5cd95b558b64f3432e4134be3b7962c1ca1f57e9',
        name : 'Sergio',
        surname : 'Rinaudo',
        email : 'kaiohken1982@hotmail.com',
        gender : 'm',
        dateBorn : '26 marzo 1982',
        nicename : 'Razorblade',
        mobile : '3386776419',
        isAdmin : true,
        fullname : 'Sergio Rinaudo',
        activationaddress : 'http:\/\/www.neobazaar.com\/#\/user\/activation\/5cd95b558b64f3432e4134be3b7962c1ca1f57e9',
        role : 'god',
        state : 1,
        stateFormatted : 'Attivo',
        editAddress : '\/#\/edituseerrr',
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