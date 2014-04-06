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
    port: 8081,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // list of files / patterns to load in the browser
    files : [
      //3rd Party Code
      "app/bower_components/jquery/dist/jquery.js",
      "app/bower_components/angular/angular.js",
      "app/bower_components/angular-resource/angular-resource.js",
      "app/bower_components/angular-cookies/angular-cookies.js",
      "app/bower_components/angular-sanitize/angular-sanitize.js",
      "app/bower_components/angular-route/angular-route.js",
      "app/bower_components/angular-mocks/angular-mocks.js",
//      "app/bower_components/angular-scenario/angular-scenario.js",
      "app/bower_components/bootstrap/dist/js/bootstrap.js",
      "app/bower_components/bootstrap-sass/dist/js/bootstrap.js",
      "app/bower_components/jquery-ui/ui/jquery-ui.js",
      "app/bower_components/blueimp-load-image/js/load-image.js",
      "app/bower_components/blueimp-load-image/js/load-image-ios.js",
      "app/bower_components/blueimp-load-image/js/load-image-orientation.js",
      "app/bower_components/blueimp-load-image/js/load-image-meta.js",
      "app/bower_components/blueimp-load-image/js/load-image-exif.js",
      "app/bower_components/blueimp-load-image/js/load-image-exif-map.js",
      "app/bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js",
      "app/bower_components/blueimp-file-upload/js/cors/jquery.postmessage-transport.js",
      "app/bower_components/blueimp-file-upload/js/cors/jquery.xdr-transport.js",
      "app/bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js",
      "app/bower_components/blueimp-file-upload/js/jquery.fileupload.js",
      "app/bower_components/blueimp-file-upload/js/jquery.fileupload-process.js",
      "app/bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js",
      "app/bower_components/blueimp-file-upload/js/jquery.fileupload-image.js",
      "app/bower_components/blueimp-file-upload/js/jquery.fileupload-audio.js",
      "app/bower_components/blueimp-file-upload/js/jquery.fileupload-video.js",
      "app/bower_components/blueimp-file-upload/js/jquery.fileupload-ui.js",
      "app/bower_components/blueimp-file-upload/js/jquery.fileupload-jquery-ui.js",
      "app/bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js",
      "app/bower_components/blueimp-file-upload/js/jquery.iframe-transport.js",
      "app/bower_components/angular-local-storage/angular-local-storage.js",
      "app/bower_components/jquery-ui/ui/minified/jquery-ui.min.js",
      "app/bower_components/angular-ui/build/angular-ui.js",
      "app/js/jquery.lightbox.min.js",
      
      
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