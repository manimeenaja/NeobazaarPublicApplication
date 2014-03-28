'use strict';

var app = angular.module('Neobazaar', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui',
  'LocalStorageModule',
  'Neobazaar.directives',
  'Neobazaar.services',
  'blueimp.fileupload'
]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl : 'views/index.html',
    controller : 'IndexController'
  }).when('/annunci-:location/:purpose/:category/:page', {
    templateUrl : '/views/serp.html',
    controller : 'SerpController'
  }).when('/annunci-:location/:purpose/:category', {
    templateUrl : '/views/serp.html',
    controller : 'SerpController'
  }).when('/annunci-:location/:purpose', {
    templateUrl : '/views/serp.html',
    controller : 'SerpController'
  }).when('/annunci-:location', {
    templateUrl : '/views/serp.html',
    controller : 'SerpController',
  // resolve: {
  // classifieds: function(ClassifiedsLoader) {
  // return ClassifiedsLoader();
  // }
  // },
  }).when('/:category/:slug/:id.html', {
    templateUrl : '/views/detail.html',
    controller : 'DetailController',
  // resolve: {
  // classified: function(ClassifiedLoader) {
  // return ClassifiedLoader();
  // }
  // },
  }).when('/add-classified.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AddClassifiedController'
  }).when('/pubblica-annuncio.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AddClassifiedController'
  }).when('/register.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'RegisterController'
  }).when('/login.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    // templateUrl: '/views/login.html',
    controller : 'LoginController'
  }).when('/account.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AccountController'
  }).when('/account-deleted', {
    templateUrl : '/views/account-deleted.html',
    controller : 'AccountDeletedController'
  }).when('/account/:page', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AccountController'
  }).when('/logout.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'LogoutController'
  }).when('/edit-classified/:id', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AddClassifiedController'
  }).when('/classified-activation/:id.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'ActivateClassifiedController'
  }).when('/profile.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'ProfileController'
  }).when('/support.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'SupportController'
  }).when('/admin/classified', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AdminClassifiedController'
  }).when('/admin/classified/:page', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AdminClassifiedController'
  }).when('/admin/classified/:page/:user', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AdminClassifiedController'
  }).when('/admin/user', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AdminUserController'
  }).when('/admin/user/:page', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AdminUserController'
  }).when('/admin/user/:page/:email', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'AdminUserController'
  }).when('/admin/edit-user/:id', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'ProfileController'
  }).when('/user-activation/:id.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'UserActivationController'
  }).when('/privacy.html', {
    templateUrl : '/views/info.html',
    controller : 'InfoController'
  }).when('/conditions.html', {
    templateUrl : '/views/info.html',
    controller : 'InfoController'
  }).when('/password-recovery.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'PasswordRecoveryController'
  }).when('/password-recovery/:id.html', {
    template : '<div ng-include="getTemplateUrl()"></div>',
    controller : 'PasswordRecoveredController'
  }).when('/', {
    templateUrl : '/views/index.html',
    controller : 'IndexController'
  });
  
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}).run(
    [
  '$rootScope',
  'LoggedInLoader',
  'CategoriesLoader',
  'LocationsLoader',
  '$timeout',
  function($rootScope, LoggedInLoader, CategoriesLoader, LocationsLoader,
            $timeout) {
          // All GLOBAL here
    
          $rootScope.siteConfigs = {
              siteurl: 'https://www.neobazaar.eu', 
              sitename: 'Neobazaar annunci gratuiti'
          }
    
          $rootScope.fb = {
            title : 'Neobazaar annunci gratuiti',
            type : 'object',
            url : $rootScope.siteConfigs.siteurl,
            description : 'Neobazaar - Annunci gratuiti Case, Auto usate, Moto, Offerte lavoro e annunci Usato',
            sitename : $rootScope.siteConfigs.sitename,
            image : $rootScope.siteConfigs.siteurl + '/img/logo3.gif',
          };
          
          
          $rootScope.redirectionDelay = 2500;
          $rootScope.checkedLogged = false;
          $rootScope.logged = false;
          $rootScope.userData = null;

          $rootScope.check = function() {
            $rootScope.resource = new LoggedInLoader({});

            $rootScope.resource.then(function(data) {
              if (!data.logged) {
                $rootScope.logged = false;
              } else {
                $rootScope.logged = data.logged;
                $rootScope.userData = data.data;
              }
              $rootScope.checkedLogged = true;
            }, function() {
              $rootScope.logged = false;
              $rootScope.checkedLogged = true;
            });
          };
          $rootScope.check();

          $rootScope.$on('loggedIn', function() {
            $rootScope.logged = true;
            // console.log('loggedIn listener recheck');
            $rootScope.check();
          });

          $rootScope.$on('loggedOut', function() {
            $rootScope.logged = false;
            // console.log('loggedOut listener recheck');
            $rootScope.check();
          });

          // Categories for add/edit form
          $rootScope.categories = [];
          $rootScope.loadCategories = function() {
            var categoriesResource = new CategoriesLoader();

            categoriesResource.then(function(data) {
              $rootScope.categories = data.data;
            });
          };
          $timeout(function() {
            $rootScope.loadCategories();
          }, 1000);

          // Locations for add/edit form
          $rootScope.locations = [];
          $rootScope.loadLocations = function() {
            var locationsResource = new LocationsLoader();

            locationsResource.then(function(data) {
              $rootScope.locations = data.data;
            });
          };
          $timeout(function() {
            $rootScope.loadLocations();
          }, 1500);

          // Meta select
          $rootScope.contracttypes = [ {
            value : 'vendita',
            label : 'In Vendita'
          }, {
            value : 'affitto',
            label : 'In Affitto'
          } ];

          // select per il form i ricerca
          $rootScope.searchFormLocation = [];

          // se la regione è selezionata ok, altrimenti visualizzare messaggio
          $rootScope.comune = [];

          $rootScope.cambio = [ {
            value : 'manuale',
            label : 'Manuale'
          }, {
            value : 'automatico',
            label : 'Automatico'
          }, {
            value : 'sequenziale',
            label : 'Sequenziale'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.cartype = [ {
            value : 'utilitaria',
            label : 'Utilitaria'
          }, {
            value : 'berlina',
            label : 'Berlina'
          }, {
            value : 'station_wagon',
            label : 'Station Wagon'
          }, {
            value : 'monovolume',
            label : 'Monovolume'
          }, {
            value : 'fuoristrada',
            label : 'Fuoristrada/SUV'
          }, {
            value : 'cabrio',
            label : 'Cabrio'
          }, {
            value : 'coupe',
            label : 'Coupé'
          }, {
            value : 'van',
            label : 'Van/Minibus'
          }, {
            value : 'commerciale',
            label : 'Veicolo Commerciale'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.carbrand = [ {
            value : 'abarth',
            label : 'Abarth'
          }, {
            value : 'ac',
            label : 'AC'
          }, {
            value : 'acura',
            label : 'Acura'
          }, {
            value : 'aixam',
            label : 'Aixam'
          }, {
            value : 'alfa-romeo',
            label : 'Alfa Romeo'
          }, {
            value : 'artega',
            label : 'Artega'
          }, {
            value : 'asia',
            label : 'Asia'
          }, {
            value : 'aston-martin',
            label : 'Aston Martin'
          }, {
            value : 'audi',
            label : 'Audi'
          }, {
            value : 'austin',
            label : 'Austin'
          }, {
            value : 'autobianchi',
            label : 'Autobianchi'
          }, {
            value : 'bentley',
            label : 'Bentley'
          }, {
            value : 'bertone',
            label : 'Bertone'
          }, {
            value : 'bmw',
            label : 'BMW'
          }, {
            value : 'bmw-alpina',
            label : 'BMW-Alpina'
          }, {
            value : 'brilliance',
            label : 'Brilliance'
          }, {
            value : 'bugatti',
            label : 'Bugatti'
          }, {
            value : 'buick',
            label : 'Buick'
          }, {
            value : 'byd',
            label : 'BYD'
          }, {
            value : 'cadillac',
            label : 'Cadillac'
          }, {
            value : 'caravans-wohnm',
            label : 'Caravans-Wohnm'
          }, {
            value : 'caterham',
            label : 'Caterham'
          }, {
            value : 'chetenet',
            label : 'Chatenet'
          }, {
            value : 'chery',
            label : 'Chery'
          }, {
            value : 'chevrolet',
            label : 'Chevrolet'
          }, {
            value : 'china-automobile',
            label : 'China Automobile'
          }, {
            value : 'chrysler',
            label : 'Chrysler'
          }, {
            value : 'citroen',
            label : 'Citroen'
          }, {
            value : 'continental',
            label : 'Continental'
          }, {
            value : 'corvette',
            label : 'Corvette'
          }, {
            value : 'dacia',
            label : 'Dacia'
          }, {
            value : 'daewoo',
            label : 'Daewoo'
          }, {
            value : 'daf',
            label : 'DAF'
          }, {
            value : 'daihatsu',
            label : 'Daihatsu'
          }, {
            value : 'de-lorean',
            label : 'De Lorean'
          }, {
            value : 'deltomaso',
            label : 'De Tomaso'
          }, {
            value : 'derways',
            label : 'Derways'
          }, {
            value : 'dodge',
            label : 'Dodge'
          }, {
            value : 'donkervoort',
            label : 'Donkervoort'
          }, {
            value : 'dr-motor',
            label : 'DR Motor'
          }, {
            value : 'ferrari',
            label : 'Ferrari'
          }, {
            value : 'fiat',
            label : 'Fiat'
          }, {
            value : 'ford',
            label : 'Ford'
          }, {
            value : 'fun-tech',
            label : 'Fun Tech'
          }, {
            value : 'galloper',
            label : 'Galloper'
          }, {
            value : 'gaz',
            label : 'GAZ'
          }, {
            value : 'geely',
            label : 'Geely'
          }, {
            value : 'gillet',
            label : 'Gillet'
          }, {
            value : 'ginetta',
            label : 'Ginetta'
          }, {
            value : 'gmc',
            label : 'GMC'
          }, {
            value : 'great-wall',
            label : 'Great Wall'
          }, {
            value : 'hdpic',
            label : 'HDPIC'
          }, {
            value : 'honda',
            label : 'Honda'
          }, {
            value : 'hummer',
            label : 'HUMMER'
          }, {
            value : 'hyundai',
            label : 'Hyundai'
          }, {
            value : 'infiniti',
            label : 'Infiniti'
          }, {
            value : 'innocenti',
            label : 'Innocenti'
          }, {
            value : 'isuzu',
            label : 'Isuzu'
          }, {
            value : 'iveco',
            label : 'Iveco'
          }, {
            value : 'izh',
            label : 'IZH'
          }, {
            value : 'jaguar',
            label : 'Jaguar'
          }, {
            value : 'jdm',
            label : 'JDM'
          }, {
            value : 'jeep',
            label : 'Jeep'
          }, {
            value : 'keinath',
            label : 'Keinath'
          }, {
            value : 'kia',
            label : 'Kia'
          }, {
            value : 'koenigsegg',
            label : 'Koenigsegg'
          }, {
            value : 'la-forza',
            label : 'La Forza'
          }, {
            value : 'lada',
            label : 'Lada'
          }, {
            value : 'lamborghini',
            label : 'Lamborghini'
          }, {
            value : 'lancia',
            label : 'Lancia'
          }, {
            value : 'land-rover',
            label : 'Land Rover'
          }, {
            value : 'landwind',
            label : 'Landwind'
          }, {
            value : 'lexus',
            label : 'Lexus'
          }, {
            value : 'lifan',
            label : 'Lifan'
          }, {
            value : 'ligier',
            label : 'Ligier'
          }, {
            value : 'lincoln',
            label : 'Lincoln'
          }, {
            value : 'lotus',
            label : 'Lotus'
          }, {
            value : 'mahindra',
            label : 'Mahindra'
          }, {
            value : 'marcos',
            label : 'Marcos'
          }, {
            value : 'maserati',
            label : 'Maserati'
          }, {
            value : 'maybach',
            label : 'Maybach'
          }, {
            value : 'mazda',
            label : 'Mazda'
          }, {
            value : 'merceder-benz',
            label : 'Mercedes-Benz'
          }, {
            value : 'mercury',
            label : 'Mercury'
          }, {
            value : 'mg',
            label : 'MG'
          }, {
            value : 'microcar',
            label : 'Microcar'
          }, {
            value : 'mini',
            label : 'MINI'
          }, {
            value : 'mitsubishi',
            label : 'Mitsubishi'
          }, {
            value : 'morgan',
            label : 'Morgan'
          }, {
            value : 'moskvich',
            label : 'Moskvich'
          }, {
            value : 'motos-bikes',
            label : 'Motos-Bikes'
          }, {
            value : 'nissan',
            label : 'Nissan'
          }, {
            value : 'noble',
            label : 'Noble'
          }, {
            value : 'oldsmobile',
            label : 'Oldsmobile'
          }, {
            value : 'oldtimer',
            label : 'Oldtimer'
          }, {
            value : 'opel',
            label : 'Opel'
          }, {
            value : 'pagani',
            label : 'Pagani'
          }, {
            value : 'panther',
            label : 'Panther'
          }, {
            value : 'peugeot',
            label : 'Peugeot'
          }, {
            value : 'piaggio',
            label : 'Piaggio'
          }, {
            value : 'plymouth',
            label : 'Plymouth'
          }, {
            value : 'polaris',
            label : 'Polaris'
          }, {
            value : 'pontiac',
            label : 'Pontiac'
          }, {
            value : 'porsche',
            label : 'Porsche'
          }, {
            value : 'proton',
            label : 'Proton'
          }, {
            value : 'puch',
            label : 'Puch'
          }, {
            value : 'renault',
            label : 'Renault'
          }, {
            value : 'rolls-royce',
            label : 'Rolls-Royce'
          }, {
            value : 'rover',
            label : 'Rover'
          }, {
            value : 'saab',
            label : 'Saab'
          }, {
            value : 'santana',
            label : 'Santana'
          }, {
            value : 'seat',
            label : 'Seat'
          }, {
            value : 'skoda',
            label : 'Skoda'
          }, {
            value : 'smart',
            label : 'Smart'
          }, {
            value : 'spyker',
            label : 'Spyker'
          }, {
            value : 'ssangyong',
            label : 'SsangYong'
          }, {
            value : 'subaru',
            label : 'Subaru'
          }, {
            value : 'suzuki',
            label : 'Suzuki'
          }, {
            value : 'tagaz',
            label : 'TagAZ'
          }, {
            value : 'talbot',
            label : 'Talbot'
          }, {
            value : 'tata',
            label : 'Tata'
          }, {
            value : 'teener',
            label : 'Teener'
          }, {
            value : 'toyota',
            label : 'Toyota'
          }, {
            value : 'trabant',
            label : 'Trabant'
          }, {
            value : 'trailer-anhanger',
            label : 'Trailer-Anhänger'
          }, {
            value : 'triumph',
            label : 'Triumph'
          }, {
            value : 'trucks-lkw',
            label : 'Trucks-Lkw'
          }, {
            value : 'tvr',
            label : 'TVR'
          }, {
            value : 'uaz',
            label : 'UAZ'
          }, {
            value : 'vauxhall',
            label : 'Vauxhall'
          }, {
            value : 'vaz',
            label : 'VAZ'
          }, {
            value : 'venturi',
            label : 'Venturi'
          }, {
            value : 'volkswagen',
            label : 'Volkswagen'
          }, {
            value : 'volvo',
            label : 'Volvo'
          }, {
            value : 'wartburg',
            label : 'Wartburg'
          }, {
            value : 'wiesmann',
            label : 'Wiesmann'
          }, {
            value : 'yes',
            label : 'YES!'
          }, {
            value : 'zastava',
            label : 'Zastava'
          }, {
            value : 'zaz',
            label : 'ZAZ'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.fuel = [ {
            value : 'benzina',
            label : 'Benzina'
          }, {
            value : 'gasolio',
            label : 'Gasolio'
          }, {
            value : 'gas',
            label : 'Gas'
          }, {
            value : 'elettrica',
            label : 'Elettrica'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.carcondition = [ {
            value : 'nuovo',
            label : 'Nuovo'
          }, {
            value : 'usato',
            label : 'Usato'
          }, {
            value : 'epoca',
            label : 'D\'epoca'
          }, {
            value : 'demo',
            label : 'Dimostrativa'
          }, {
            value : 'azienda',
            label : 'Aziendale'
          }, {
            value : 'zero',
            label : 'Km0'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];
          $rootScope.motocondition = $rootScope.carcondition;

          $rootScope.euroclass = [ {
            value : 'euro0',
            label : 'Pre-Euro'
          }, {
            value : 'euro1',
            label : 'Euro 1'
          }, {
            value : 'euro2',
            label : 'Euro 2'
          }, {
            value : 'euro3',
            label : 'Euro 3'
          }, {
            value : 'euro4',
            label : 'Euro 4'
          }, {
            value : 'euro5',
            label : 'Euro 5'
          } ];

          $rootScope.motobrand = [ {
            value : 'atu',
            label : 'A.T.U'
          }, {
            value : 'adler',
            label : 'Adler'
          }, {
            value : 'adly',
            label : 'Adly'
          }, {
            value : 'aeon',
            label : 'Aeon'
          }, {
            value : 'agm',
            label : 'AGM'
          }, {
            value : 'aiyumo',
            label : 'Aiyumo'
          }, {
            value : 'alisze',
            label : 'Alisze'
          }, {
            value : 'alpha',
            label : 'Alpha'
          }, {
            value : 'aprilia',
            label : 'Aprilia'
          }, {
            value : 'artic-cat',
            label : 'Arctic Cat'
          }, {
            value : 'awo',
            label : 'AWO'
          }, {
            value : 'baotian',
            label : 'Baotian'
          }, {
            value : 'barossa',
            label : 'Barossa'
          }, {
            value : 'bashan',
            label : 'Bashan'
          }, {
            value : 'benda',
            label : 'Benda'
          }, {
            value : 'benelli',
            label : 'Benelli'
          }, {
            value : 'benzhou',
            label : 'Benzhou'
          }, {
            value : 'beta',
            label : 'Beta'
          }, {
            value : 'bimota',
            label : 'Bimota'
          }, {
            value : 'blata',
            label : 'Blata'
          }, {
            value : 'bmw',
            label : 'BMW'
          }, {
            value : 'bombardier',
            label : 'Bombardier'
          }, {
            value : 'boom-trike',
            label : 'Boom Trike'
          }, {
            value : 'borossi',
            label : 'Borossi'
          }, {
            value : 'boss-hoss',
            label : 'Boss Hoss'
          }, {
            value : 'bsa',
            label : 'BSA'
          }, {
            value : 'buell',
            label : 'Buell'
          }, {
            value : 'burelli',
            label : 'Burelli'
          }, {
            value : 'cagiva',
            label : 'Cagiva'
          }, {
            value : 'can-am',
            label : 'Can Am'
          }, {
            value : 'ccm',
            label : 'CCM'
          }, {
            value : 'cectek',
            label : 'Cectek'
          }, {
            value : 'chang-jiang',
            label : 'Chang - Jiang'
          }, {
            value : 'cpi',
            label : 'CPI'
          }, {
            value : 'cres',
            label : 'CR&amp;S'
          }, {
            value : 'csr',
            label : 'CSR'
          }, {
            value : 'cz',
            label : 'CZ'
          }, {
            value : 'daelim',
            label : 'Daelim'
          }, {
            value : 'derby',
            label : 'Derbi'
          }, {
            value : 'dinli',
            label : 'Dinli'
          }, {
            value : 'dkw',
            label : 'DKW'
          }, {
            value : 'dnepr',
            label : 'Dnepr'
          }, {
            value : 'ducati',
            label : 'Ducati'
          }, {
            value : 'e-atv',
            label : 'E.-ATV'
          }, {
            value : 'ecomobile',
            label : 'Ecomobile'
          }, {
            value : 'e-max',
            label : 'E-Max'
          }, {
            value : 'emw',
            label : 'EMW'
          }, {
            value : 'epella',
            label : 'Epella'
          }, {
            value : 'ering',
            label : 'Ering'
          }, {
            value : 't-ton',
            label : 'E-Ton'
          }, {
            value : 'explorer',
            label : 'Explorer'
          }, {
            value : 'fantic',
            label : 'Fantic'
          }, {
            value : 'fecht-trike',
            label : 'Fecht Trike'
          }, {
            value : 'garelli',
            label : 'Garelli'
          }, {
            value : 'gas-gas',
            label : 'Gas Gas'
          }, {
            value : 'genata',
            label : 'Genata'
          }, {
            value : 'generic',
            label : 'Generic'
          }, {
            value : 'gg',
            label : 'GG'
          }, {
            value : 'giantco',
            label : 'Giantco'
          }, {
            value : 'gilera',
            label : 'Gilera'
          }, {
            value : 'gillet',
            label : 'Gillet'
          }, {
            value : 'goes',
            label : 'Goes'
          }, {
            value : 'harley-devidson',
            label : 'Harley-Davidson'
          }, {
            value : 'heinkel',
            label : 'Heinkel'
          }, {
            value : 'hercules',
            label : 'Hercules'
          }, {
            value : 'hisun',
            label : 'Hisun'
          }, {
            value : 'hm',
            label : 'HM'
          }, {
            value : 'honda',
            label : 'Honda'
          }, {
            value : 'horex',
            label : 'Horex'
          }, {
            value : 'husaberg',
            label : 'Husaberg'
          }, {
            value : 'husqvarna',
            label : 'Husqvarna'
          }, {
            value : 'hyosung',
            label : 'Hyosung'
          }, {
            value : 'ifa',
            label : 'IFA'
          }, {
            value : 'indian',
            label : 'Indian'
          }, {
            value : 'italjet',
            label : 'Italjet'
          }, {
            value : 'iwl',
            label : 'IWL'
          }, {
            value : 'jack-fox',
            label : 'Jack Fox'
          }, {
            value : 'jawa',
            label : 'Jawa'
          }, {
            value : 'jincheng',
            label : 'Jincheng'
          }, {
            value : 'jinlun',
            label : 'Jinlun'
          }, {
            value : 'jonway',
            label : 'Jonway'
          }, {
            value : 'kawasaki',
            label : 'Kawasaki'
          }, {
            value : 'keeway',
            label : 'Keeway'
          }, {
            value : 'kinroad',
            label : 'Kinroad'
          }, {
            value : 'kreidle',
            label : 'Kreidler'
          }, {
            value : 'ktm',
            label : 'KTM'
          }, {
            value : 'kwang-yang',
            label : 'Kwang Yang'
          }, {
            value : 'kymco',
            label : 'Kymco'
          }, {
            value : 'laverda',
            label : 'Laverda'
          }, {
            value : 'lem',
            label : 'LEM'
          }, {
            value : 'leonart',
            label : 'Leonart'
          }, {
            value : 'lifan',
            label : 'Lifan'
          }, {
            value : 'linhai',
            label : 'Linhai'
          }, {
            value : 'lml-vespa',
            label : 'LML - Vespa'
          }, {
            value : 'loncin',
            label : 'Loncin'
          }, {
            value : 'luxxon',
            label : 'Luxxon'
          }, {
            value : 'maico',
            label : 'Maico'
          }, {
            value : 'malaguti',
            label : 'Malaguti'
          }, {
            value : 'masai',
            label : 'Masai'
          }, {
            value : 'mbk',
            label : 'MBK'
          }, {
            value : 'mc-motors',
            label : 'Mc Motors'
          }, {
            value : 'miele',
            label : 'Miele'
          }, {
            value : 'montesa',
            label : 'Montesa'
          }, {
            value : 'moto-guzzi',
            label : 'Moto Guzzi'
          }, {
            value : 'mMoto-morini',
            label : 'Moto Morini'
          }, {
            value : 'motobecane',
            label : 'Motobecane'
          }, {
            value : 'motobi',
            label : 'Motobi'
          }, {
            value : 'motorhispania',
            label : 'Motorhispania'
          }, {
            value : 'mtr',
            label : 'MTR'
          }, {
            value : 'mv-agusta',
            label : 'MV Agusta'
          }, {
            value : 'mz',
            label : 'MZ'
          }, {
            value : 'nitro-motors',
            label : 'Nitro Motors'
          }, {
            value : 'norton',
            label : 'Norton'
          }, {
            value : 'nsu',
            label : 'NSU'
          }, {
            value : 'palmo',
            label : 'Palmo'
          }, {
            value : 'panther',
            label : 'Panther'
          }, {
            value : 'pegasus',
            label : 'Pegasus'
          }, {
            value : 'peugeot',
            label : 'Peugeot'
          }, {
            value : 'pgo',
            label : 'PGO'
          }, {
            value : 'piaggio',
            label : 'Piaggio'
          }, {
            value : 'pocket-bike',
            label : 'Pocket Bike'
          }, {
            value : 'polaris',
            label : 'Polaris'
          }, {
            value : 'puch',
            label : 'Puch'
          }, {
            value : 'qingqi',
            label : 'Qingqi'
          }, {
            value : 'real',
            label : 'Real'
          }, {
            value : 'regal-raptor',
            label : 'Regal-Raptor'
          }, {
            value : 'rewaco',
            label : 'Rewaco'
          }, {
            value : 'rex',
            label : 'REX'
          }, {
            value : 'rieju',
            label : 'Rieju'
          }, {
            value : 'rivero',
            label : 'Rivero'
          }, {
            value : 'royal-enfield',
            label : 'Royal Enfield'
          }, {
            value : 'sachs',
            label : 'Sachs'
          }, {
            value : 'seikel',
            label : 'Seikel'
          }, {
            value : 'sherco',
            label : 'Sherco'
          }, {
            value : 'shineray',
            label : 'Shineray'
          }, {
            value : 'simson',
            label : 'Simson'
          }, {
            value : 'skyteam',
            label : 'Skyteam'
          }, {
            value : 'smc',
            label : 'SMC'
          }, {
            value : 'solo',
            label : 'Solo'
          }, {
            value : 'standard',
            label : 'Standard'
          }, {
            value : 'suzuki',
            label : 'Suzuki'
          }, {
            value : 'sym',
            label : 'SYM'
          }, {
            value : 'tauris',
            label : 'Tauris'
          }, {
            value : 'tgb',
            label : 'TGB'
          }, {
            value : 'tm',
            label : 'TM'
          }, {
            value : 'tomos',
            label : 'Tomos'
          }, {
            value : 'trike',
            label : 'Trike'
          }, {
            value : 'triton',
            label : 'Triton'
          }, {
            value : 'triumph',
            label : 'Triumph'
          }, {
            value : 'ural',
            label : 'Ural'
          }, {
            value : 'velosolex',
            label : 'Velosolex'
          }, {
            value : 'vespa',
            label : 'Vespa'
          }, {
            value : 'vespino',
            label : 'Vespino'
          }, {
            value : 'victoria',
            label : 'Victoria'
          }, {
            value : 'victory',
            label : 'Victory'
          }, {
            value : 'vor-vertemati',
            label : 'VOR Vertemati'
          }, {
            value : 'voxan',
            label : 'Voxan'
          }, {
            value : 'wmi',
            label : 'WMI'
          }, {
            value : 'xingfu',
            label : 'Xingfu'
          }, {
            value : 'yamaha',
            label : 'Yamaha'
          }, {
            value : 'zhongyu',
            label : 'Zhongyu'
          }, {
            value : 'zingz',
            label : 'Zing'
          }, {
            value : 'zongshen',
            label : 'Zongshen'
          }, {
            value : 'zundapp',
            label : 'Zündapp'
          }, {
            value : 'zweirad-union',
            label : 'Zweirad Union'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.displacement = [ {
            value : '50',
            label : '50'
          }, {
            value : '125',
            label : '125'
          }, {
            value : '150',
            label : '150'
          }, {
            value : '250',
            label : '250'
          }, {
            value : '600',
            label : '600'
          }, {
            value : '750',
            label : '750'
          }, {
            value : '900',
            label : '900'
          } ];

          $rootScope.mototype = [ {
            value : 'chopper-cruiser',
            label : 'Chopper/Cruiser'
          }, {
            value : 'ciclomotori',
            label : 'Ciclomotori'
          }, {
            value : 'cross',
            label : 'Cross'
          }, {
            value : 'enduro',
            label : 'Enduro'
          }, {
            value : 'enduro-stradale',
            label : 'Enduro stradale'
          }, {
            value : 'epoca',
            label : 'Epoca'
          }, {
            value : 'minimoto',
            label : 'Minimoto'
          }, {
            value : 'naked',
            label : 'Naked'
          }, {
            value : 'quad-atv',
            label : 'Quad/ATV'
          }, {
            value : 'racing',
            label : 'Racing'
          }, {
            value : 'rally',
            label : 'Rally'
          }, {
            value : 'scooter',
            label : 'Scooter'
          }, {
            value : 'sidecar',
            label : 'Sidecar'
          }, {
            value : 'sport-touring',
            label : 'Sport touring'
          }, {
            value : 'streetfighter',
            label : 'Streetfighter'
          }, {
            value : 'super-sportive',
            label : 'Super sportive'
          }, {
            value : 'supermotard',
            label : 'Supermotard'
          }, {
            value : 'tourer',
            label : 'Tourer'
          }, {
            value : 'trial',
            label : 'Trial'
          }, {
            value : 'trike',
            label : 'Trike'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.boattype = [ {
            value : 'motore',
            label : 'Barca a motore'
          }, {
            value : 'vela',
            label : 'Barca a vela'
          }, {
            value : 'gommone',
            label : 'Gommone'
          }, {
            value : 'acqua',
            label : 'Moto d\'acqua'
          }, {
            value : 'accessori',
            label : 'Accessori'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.campertype = [ {
            value : 'camper',
            label : 'Camper puro'
          }, {
            value : 'caravan',
            label : 'Caravan/Roulotte'
          }, {
            value : 'mansardato',
            label : 'Mansardato'
          }, {
            value : 'motorhome',
            label : 'Motorhome'
          }, {
            value : 'semiintegrale',
            label : 'Semi-integrale'
          }, {
            value : 'rimorchio',
            label : 'Rimorchio/altro'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.room = [ {
            value : '1',
            label : '1'
          }, {
            value : '2',
            label : '2'
          }, {
            value : '3',
            label : '3'
          }, {
            value : '4',
            label : '4'
          }, {
            value : '5',
            label : '5'
          }, {
            value : '6',
            label : '6'
          }, {
            value : '7',
            label : '7'
          }, {
            value : '8',
            label : '8'
          }, {
            value : '9',
            label : '9'
          }, {
            value : '10',
            label : '10'
          } ];

          $rootScope.garden = [ {
            value : 'nessuno',
            label : 'Nessuno'
          }, {
            value : 'privato',
            label : 'Privato'
          }, {
            value : 'comune',
            label : 'Comune'
          } ];

          $rootScope.carbox = [ {
            value : 'nessuno',
            label : 'Nessuno'
          }, {
            value : 'singolo',
            label : 'Singolo'
          }, {
            value : 'doppio',
            label : 'Doppio'
          }, {
            value : 'auto',
            label : 'Posto Auto'
          } ];

          $rootScope.floor = [ {
            value : 'seminterrato',
            label : 'Seminterrato'
          }, {
            value : 'terra',
            label : 'Piano terra'
          }, {
            value : 'primo',
            label : 'Primo'
          }, {
            value : 'secondo',
            label : 'Secondo'
          }, {
            value : 'terzo',
            label : 'Terzo'
          }, {
            value : 'quarto',
            label : 'Quarto'
          }, {
            value : 'quinto',
            label : 'Quinto'
          }, {
            value : 'sesto',
            label : 'Sesto'
          }, {
            value : 'settimo',
            label : 'Settimo'
          }, {
            value : 'soprailsettimo',
            label : 'Sopra il settimo'
          }, {
            value : 'ultimo',
            label : 'Ultimo'
          }, {
            value : 'rialzato',
            label : 'Piano Rialzato'
          }, {
            value : 'multilivello',
            label : 'Su più livelli'
          } ];

          $rootScope.condition = [ {
            value : 'abitabile',
            label : 'Abitabile'
          }, {
            value : 'nuovo',
            label : 'Nuovo'
          }, {
            value : 'ristrutturato',
            label : 'Ristrutturato'
          }, {
            value : 'ristrutturare',
            label : 'Da ristrutturare'
          } ];

          $rootScope.deed = [ {
            value : 'occupato',
            label : 'Occupato'
          }, {
            value : 'libero',
            label : 'Libero'
          }, {
            value : 'proprieta',
            label : 'Nuda Proprietà'
          }, {
            value : 'affittato',
            label : 'Affittato'
          } ];

          $rootScope.heating = [ {
            value : 'nessuno',
            label : 'Nessuno'
          }, {
            value : 'autonomo',
            label : 'Autonomo'
          }, {
            value : 'centralizzato',
            label : 'Centralizzato'
          } ];

          $rootScope.bathroom = [ {
            value : '1',
            label : '1'
          }, {
            value : '2',
            label : '2'
          }, {
            value : '3',
            label : '3'
          }, {
            value : '4',
            label : '4'
          }, {
            value : '5',
            label : '5'
          } ];

          $rootScope.smoker = [ {
            value : 'si',
            label : 'Consentito'
          }, {
            value : 'no',
            label : 'Non consentito'
          } ];

          $rootScope.roomtype = [ {
            value : 'singola',
            label : 'Singola'
          }, {
            value : 'condivisa',
            label : 'In condivisione'
          } ];

          $rootScope.rentto = [ {
            value : 'uomini',
            label : 'Uomini'
          }, {
            value : 'donne',
            label : 'Donne'
          }, {
            value : 'ambosessi',
            label : 'Ambosessi'
          } ];

          $rootScope.jobcontracttype = [ {
            value : 'agente',
            label : 'Agente/P.Iva'
          }, {
            value : 'apprendistato',
            label : 'Apprendistato'
          }, {
            value : 'indeterminato',
            label : 'Tempo indeterminato'
          }, {
            value : 'progetto',
            label : 'Contratto a progetto'
          }, {
            value : 'stage',
            label : 'Stage'
          }, {
            value : 'determinato',
            label : 'Tempo determinato'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.jobtype = [ {
            value : 'dirigente',
            label : 'Dirigente'
          }, {
            value : 'impiegato',
            label : 'Impiegato'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.workinghours = [ {
            value : 'full',
            label : 'Full time'
          }, {
            value : 'part',
            label : 'Part time'
          }, {
            value : 'turni',
            label : 'Turni'
          }, {
            value : 'altro',
            label : 'Altro'
          } ];

          $rootScope.getCurrentElement = function(data, keyTocheck,
              valueToCheck) {
            for ( var i in data) {
              if (data[i][keyTocheck] === valueToCheck) {
                return data[i];
              }
            }
            return null;
          };

          $rootScope.metaMap = {
            'affittasi_a' : 'rentto',
            'anno_costruzione' : 'constructionyear',
            'ascensore' : 'lift',
            'balcone' : 'balcony',
            'box' : 'carbox',
            'boxmq' : 'areasmbox',
            'cambio' : 'cambio',
            'carburante' : 'fuel',
            'cellulare' : 'mobile', // mainform
            'cilindrata' : 'displacement',
            'civico' : 'civic',
            'classe_euro' : 'euroclass',
            'comune' : 'comune',
            'condizioni' : 'condition',
            'condizioni_auto' : 'carcondition',
            'condizioni_moto' : 'motocondition',
            'contratto_lavoro' : 'jobcontracttype',
            'external_identifier' : 'exid', // unused
            'finalita' : 'purpose',
            'fumatori' : 'smoker',
            'giardino' : 'garden',
            'giardinomq' : 'areasmgarden',
            'hidemobile' : 'hidemobile',
            'immatricolazione' : 'registration',
            'indirizzo' : 'address',
            'inquadramento_lavoro' : 'jobtype',
            'kilometri' : 'kilometri',
            'marca_auto' : 'carbrand',
            'marca_moto' : 'motobrand',
            'metri_quadri' : 'areasm',
            'numero_bagni' : 'bathroom',
            'numero_stanze' : 'room',
            'orario_lavoro' : 'workinghours',
            'piano' : 'floor',
            'prezzo' : 'price',
            'riferimento' : 'reference',
            'riscaldamento' : 'heating',
            'rogito' : 'deed',
            'spese_mensili' : 'montlyexpenses',
            'terrazzo' : 'terrace',
            'tipo_auto' : 'cartype',
            'tipo_barca' : 'boattype',
            'tipo_caravan' : 'campertype',
            'tipo_contratto' : 'contracttypes',
            'tipo_moto' : 'mototype',
            'tipo_stanza' : 'roomtype',
            'totale_piani' : 'floortotal',
            'unita_immobiliare' : 'realestateunit',
            'update_code' : 'upcode' // unused
          };

          $rootScope.categoryMap = [];
          $rootScope.categoryMap[0] = 'empty';
          $rootScope.categoryMap[26] = 'auto';
          $rootScope.categoryMap[27] = 'moto-e-scooter';
          $rootScope.categoryMap[106] = 'nautica';
          $rootScope.categoryMap[118] = 'caravan-e-camper';
          $rootScope.categoryMap[109] = 'appartamenti';
          $rootScope.categoryMap[110] = 'appartamenti'; // ville
          $rootScope.categoryMap[35] = 'appartamenti'; // uffici e locali
                                                        // commerciali
          $rootScope.categoryMap[32] = 'camera-posto-letto';
          $rootScope.categoryMap[33] = 'terreni-e-rustici';
          $rootScope.categoryMap[34] = 'terreni-e-rustici'; // box e garage
          $rootScope.categoryMap[37] = 'terreni-e-rustici'; // altri immobili
          $rootScope.categoryMap[36] = 'case-vacanza';
          $rootScope.categoryMap[61] = 'offerte-lavoro';
          $rootScope.categoryMap[62] = 'offerte-lavoro'; // ricerca lavoro
        }
]);
