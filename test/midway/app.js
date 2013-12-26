'use strict';

describe("Midway: Testing Modules", function() {
  describe("App Module:", function() {

    var module;
    beforeEach(function() {
      module = angular.module("Neobazaar");
    });

    it("should be registered", function() {
      expect(module).toNotBe(null);
      expect(module).toNotBe(undefined);
    });
  });
});