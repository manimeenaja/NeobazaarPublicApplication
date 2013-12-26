var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  var conf = sharedConfig(config);

  conf.files = conf.files.concat([
    //extra testing code

    //mocha stuff

    //test files
    'test/midway/**/*.js'
  ]);

  conf.proxies = {
    '/midway/': 'http://localhost:9999/'
  };
  
  // this is istanbul configuration for code coverage
  conf.coverageReporter = {
    type : 'html',
    dir : 'coverage/midway/'
  };

  config.set(conf);
};