'use strict';

describe("E2E: Testing Index Controller", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });
  
  it('should have a ', function() {
    browser().navigateTo('#/this-page-does-not-exists');
    expect(browser().location().path()).toBe('/this-page-does-not-exists');
    browser().navigateTo('#/');
    expect(element('h4:first').html()).toContain('»  Compra');
  });
  
});