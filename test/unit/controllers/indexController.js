'use strict';

describe('Controller: IndexController', function () {

  // load the controller's module
  beforeEach(module('Neobazaar'));

  var IndexCtrl,
    scope, $httpBackend, $rootScope;
  
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

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndexCtrl = $controller('IndexController', {
      $scope: scope
    });
  }));
  
  it('test load session', function() {
    expect($rootScope.logged).toMatch(1);
    expect($rootScope.checkedLogged).toMatch(true);
    expect($rootScope.userData.name).toMatch('Root');
    expect($rootScope.userData.isDeleted).toMatch(false);
    
    var arr = [];
    for( var i in $rootScope.userData ) {
        if ($rootScope.userData.hasOwnProperty(i)){
          arr.push($rootScope.userData[i]);
        }
    }
    
    expect(arr.length).toBe(21);
    });
});
