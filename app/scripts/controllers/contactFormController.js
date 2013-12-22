'use strict';

angular.module('Neobazaar').controller(
    'ContactFormController',
    function($scope, $routeParams, $http, $rootScope, CaptchaLoader) {
      $scope.dafaultCaptcha = 'loading';
      $scope.sent = false;
      $scope.resource = new CaptchaLoader({});
      $scope.success = function() {
        angular.element('#classifiedanswer').unblock();
        $scope.sent = true;
        $scope.getTemplateUrl();
      };

      $scope.reset = function() {
        $scope.params = {};
        $scope.params.captcha = {};
        $scope.params.id = $routeParams.id;
        $scope.params.captcha.id = $scope.dafaultCaptcha;
      };

      $scope.resource.then(function(data) {
        $scope.dafaultCaptcha = data.id;
        $scope.params.captcha.id = data.id;
      });

      $scope.response = false;
      $scope.error = function(data) {
        $scope.response = false; // reset response
        $scope.response = data;
        angular.element('#classifiedanswer').unblock();
      };

      $scope.prepareRequestParams = function() {
        angular.element('#classifiedanswer').block({
          message : '<div>Loading</div>'
        });

        return $scope.params;
      };

      $scope.getTemplateUrl = function() {
        return $scope.sent ? '/app/views/contact-form-sent.html'
            : '/app/views/contact-form.html';
      };
    });