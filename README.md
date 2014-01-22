Neobazaar Frontend Application
==============================

[![Build Status](https://travis-ci.org/kaiohken1982/NeobazaarPublicApplication.png?branch=master)](https://travis-ci.org/kaiohken1982/NeobazaarPublicApplication)
[![Coverage Status](https://coveralls.io/repos/kaiohken1982/NeobazaarPublicApplication/badge.png)](https://coveralls.io/r/kaiohken1982/NeobazaarPublicApplication)
[![Latest Stable Version](https://poser.pugx.org/neobazaar/public-application/v/stable.png)](https://packagist.org/packages/neobazaar/public-application)
[![Total Downloads](https://poser.pugx.org/neobazaar/public-application/downloads.png)](https://packagist.org/packages/neobazaar/public-application)

This module contains the AngularJS application of Neobazaar.

### Build the application for deploy

Please note you must be in the module root using the console.

```
npm install
grunt build
```

### Run unit test
 
Please note you must be in the module root using the console.

```
// run unit tests
grunt test:unit

// run midway tests
grunt test:midway

// run e2e tests
grunt test:e2e

// run all tests
grunt test
```

### Build, test and run all the task

Please note you must be in the module root using the console.

```
npm install
grunt build
```

### Note

Testing need to have ports 8080 and 9999 free, you'll get "Error listen EACCES" error if they are not.
