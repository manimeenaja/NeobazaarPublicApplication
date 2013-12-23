// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],
    
    

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
      'app/bower_components/blueimp-file-upload/js/jquery.iframe-transport.js',
      'app/bower_components/blueimp-file-upload/js/jquery.fileupload.js',
      'app/bower_components/blockui/jquery.blockUI.js',
      'app/bower_components/blueimp-file-upload/js/jquery.fileupload-process.js',
      'app/bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js',
      'app/bower_components/jquery-ui/ui/minified/jquery-ui.min.js',
      'app/bower_components/jquery-ui/ui/minified/i18n/jquery.ui.datepicker-it.min.js',
      'app/bower_components/blockui/jquery.blockUI.js',
      'app/js/jquery.lightbox.min.js',
      'app/scripts/directives/directive.js',
      'app/scripts/services/service.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js',
      
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
