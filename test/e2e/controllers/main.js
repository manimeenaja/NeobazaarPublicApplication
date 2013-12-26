'use strict';

describe("E2E: Testing Main Controller", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });
  
  it('should have a ', function() {
    browser().navigateTo('#/this-page-does-not-exists');
    expect(browser().location().path()).toBe('/');
    expect(element('h2').html()).toContain('My Todos');
  });
  
  it('should filter results', function() {
    input('todo').enter('Tommino');
    element('input#submitform').click();
    expect(repeater('#todos p').count()).toEqual(4);
  });
  
});