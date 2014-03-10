'use strict';

describe("E2E: Testing Login Controller", function() {
  var $httpBackend, $rootScope, createController;

  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    
    
      $httpBackend.when('GET', '/razor/csrf').respond([
          {"id":"869527669f09cb9b4658b82517001924"}
      ]);
      
      // Get hold of a scope (i.e. the root scope)
      $rootScope = $injector.get('$rootScope');
      
      // The $controller service is used to create instances of controllers
      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('LoginController', {'$scope' : $rootScope });
      };
  }));


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should fetch authentication token', function() {
    $httpBackend.expectGET('/razor/csrf');
    var controller = createController();
    $httpBackend.flush();
  });
  
//  beforeEach(function() {
//    browser().navigateTo('/login.html');
//  });
  
//  it('should have a ', function() {
//    //$httpBackend.flush();
//    browser().navigateTo('/login.html');
//    expect(element('h3:first').html()).toContain('Entra nella tua Area Riservata');
//  });
  
});