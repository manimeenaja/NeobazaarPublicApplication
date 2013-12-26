var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  var conf = sharedConfig(config);

  conf.files = conf.files.concat([
    //test files
    './test/e2e/**/*.js'
  ]);

  // Uncomment the following lines (proxies && urlRoot)
  // if you are using grunt's server to run the tests
  conf.proxies = {
    '/': 'http://localhost:9999/'
  };
  // URL root prevent conflicts with the site root
  conf.urlRoot = '/__karma__/';

  conf.frameworks = ['ng-scenario'];
  
  // this is istanbul configuration for code coverage
  conf.coverageReporter = {
    type : 'html',
    dir : 'coverage/e2e/'
  };

  config.set(conf);
};