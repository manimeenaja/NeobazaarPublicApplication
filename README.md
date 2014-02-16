Neobazaar Frontend Application
==============================

[![Build Status](https://travis-ci.org/kaiohken1982/NeobazaarPublicApplication.png?branch=master)](https://travis-ci.org/kaiohken1982/NeobazaarPublicApplication)
[![Coverage Status](https://coveralls.io/repos/kaiohken1982/NeobazaarPublicApplication/badge.png)](https://coveralls.io/r/kaiohken1982/NeobazaarPublicApplication)
[![Latest Stable Version](https://poser.pugx.org/neobazaar/public-application/v/stable.png)](https://packagist.org/packages/neobazaar/public-application) 
[![Total Downloads](https://poser.pugx.org/neobazaar/public-application/downloads.png)](https://packagist.org/packages/neobazaar/public-application) 
[![Latest Unstable Version](https://poser.pugx.org/neobazaar/public-application/v/unstable.png)](https://packagist.org/packages/neobazaar/public-application) 
[![License](https://poser.pugx.org/neobazaar/public-application/license.png)](https://packagist.org/packages/neobazaar/public-application)

Neobazaar is a free classifieds web application.
It is composed by the following modules:

- [Neobazaar Skeleton Application](https://github.com/kaiohken1982/NeobazaarSkeletonApplication)
- [Neobazaar Main Module](https://github.com/kaiohken1982/Neobazaar)
- [Neobazaar Document Module](https://github.com/kaiohken1982/NeobazaarDocumentModule)
- [Neobazaar User Module](https://github.com/kaiohken1982/NeobazaarUserModule)
- [Neobazaar Mailer Module](https://github.com/kaiohken1982/NeobazaarMailerModule) 
- **Neobazaar Public Application** (this module)

### Duties of this module

- This module contains the AngularJS application of Neobazaar.

### Build the application for deploy

Please note you must be in the module root using the console.

```
npm install
bower install
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
