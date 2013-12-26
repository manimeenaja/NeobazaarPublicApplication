module.exports = function(config) {
  return {
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],
    reporters: ['progress', 'coverage'],
    
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,
    colors: true,

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // list of files / patterns to load in the browser
    files : [
      //3rd Party Code
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

      //App-specific Code
      'app/scripts/directives/directive.js',
      'app/scripts/services/service.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js'

      //Test-Specific Code
    ],
  
    // this is istanbul configuration for code coverage
    preprocessors: {
      'app/scripts/**/*.js': 'coverage'
    }
  }
}