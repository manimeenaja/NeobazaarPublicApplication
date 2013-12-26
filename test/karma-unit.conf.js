var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  var conf = sharedConfig(config);

  conf.files = conf.files.concat([
    //extra testing code
    'app/bower_components/angular-mocks/angular-mocks.js',

    //test files
    './test/unit/**/*.js'
  ]);
  
  // this is istanbul configuration for code coverage
  conf.coverageReporter = {
    type : 'html',
    dir : 'coverage/unit/'
  };

  config.set(conf);
};