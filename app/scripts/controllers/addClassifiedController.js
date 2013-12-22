'use strict';

//var isOnGitHub = false;
var url = '/image';

angular
    .module('Neobazaar')
    .config(['$httpProvider', 'fileUploadProvider',
      function($httpProvider, fileUploadProvider) {
              delete $httpProvider.defaults.headers.common['X-Requested-With'];

              fileUploadProvider.defaults.handleResponse = function(e, data) {
                var files = data.result && data.result.files;

                // https://github.com/blueimp/jQuery-File-Upload/wiki/Options
                // for(var i in data.scope().queue) {
                // console.log(data.scope().queue[i]);
                // }

                data.scope().$emit('queuecheck', data.scope().queue);

                if (files) {
                  data.scope().replace(data.files, files);
                  // do what you want...
                } else if (data.errorThrown || data.textStatus === 'error') {
                  data.files[0].error = data.errorThrown || data.textStatus;
                }
              };

              angular.extend(fileUploadProvider.defaults, {
                // Enable image resizing, except for Android and Opera,
                // which actually support image resizing, but fail to
                // send Blob objects via XHR requests:
                disableImageResize : /Android(?!.*Chrome)|Opera/
                    .test(window.navigator.userAgent),
                maxFileSize : 5000000,
                acceptFileTypes : /(\.|\/)(gif|jpe?g|png)$/i
              });
            } ])
    .controller(
        'ImageUploadController',
        function($scope, $rootScope, $routeParams, $parse, $timeout, $location,
            ClassifiedLoader) {

          $rootScope.isEdit = false;
          $rootScope.waiting = true;

          if ('id' in $routeParams && 40 === ($routeParams.id).length) {
            // not connected
            if (!$rootScope.logged) {
              $scope.getTemplateUrl = function() {
                return '/app/views/loggedout/account.html';
              };
              $timeout(function() {
                $location.path('/login');
              }, $rootScope.redirectionDelay);
              return;
            }

            $rootScope.isEdit = true;
            $scope.classifiedResource = new ClassifiedLoader($routeParams);

            $scope.loadingFiles = true;
            $scope.classifiedResource.then(function(response) {

              $scope.loadingFiles = false;

              if (!$scope.classified) {
                $scope.reset();
              }
              var data = response.data;

              // not owner
              if (data.userId !== $rootScope.userData.hashId &&
                  false === $rootScope.userData.isAdmin) {
                $location.path('/account');
              }

              $scope.classified.id = data.hashId;
              $scope.classified.user.name = 'just some data'; // non viene preso
                                                              // in
                                                              // considerazione
              $scope.classified.user.email = 'dummy@user.com'; // non viene
                                                                // preso in
                                                                // considerazione
              $scope.classified.user.id = data.userid;
              $scope.classified.title = data.title;
              $scope.classified.location = $rootScope.getCurrentElement(
                  $rootScope.locations, 'value', data.location);
              $scope.classified.category = $rootScope.getCurrentElement(
                  $rootScope.categories, 'id', data.category);
              $scope.classified.content = (data.content).replace(/<br \/>/g,
                  '\n');
              $scope.classified.price = data.price;
              $scope.classified.isActive = data.isActive;

              $scope.classified.mobile = data.mobile;
              $scope.classified.hidemobile = data.hidemobile;
              $scope.classified.purpose = data.purpose;

              $scope.populateMetadata = function(scope, rootScope, metadata) {
                for ( var i in metadata) {
                  var metamap = rootScope.metaMap[metadata[i].id];
                  var data = metamap in rootScope ? rootScope[metamap] : null;
                  if (null === data) {
                    scope.classified[metamap] = metadata[i].value;
                  } else {
                    scope.classified[metamap] = rootScope.getCurrentElement(
                        rootScope[metamap], 'value', metadata[i].value);
                  }
                }
              };
              $rootScope.$on('subformLoaded', function() {
                $scope.populateMetadata($scope, $rootScope, data.meta);
                $rootScope.waiting = false;
              });

              $scope.queue = data.images || [];
            });
          } else {
            $rootScope.waiting = false;
          }
        })
    .controller(
        'AddClassifiedController',
        function($scope, $rootScope, $routeParams, Classified) {
          $scope.options = {
            url : url
          };

          // Needed to switch layout
          $scope.sent = false;

          $scope.maximages = false;
          $scope.$on('queuecheck', function(event, data) {
            $scope.maximages = data.length >= 5;
          });

          $scope.successfull = function(data) {
            angular.element('#classified').unblock();
            try {
              if ('status' in data && 'success' === data.status) {
                $scope.sent = true;
              }
            } catch (e) {
            }
          };

          $scope.reset = function() {
            angular.element('html, body').animate({
              scrollTop : 0
            }, 'slow');
            $scope.classified = {
              'category' : {},
              'location' : {},
              'user' : {},
              'purpose' : 'vendita',
              'price' : ''
            };

            if ($rootScope.logged) {
              $scope.classified.user.name = 'just some data'; // non viene preso
                                                              // in
                                                              // considerazione
              $scope.classified.user.email = 'dummy@user.com'; // non viene
                                                                // preso in
                                                                // considerazione
            }
          };
          // $scope.reset();

          $scope.$watch('logged', function() {
            $scope.reset();
            $scope.classified.user.name = 'just some data'; // non viene preso
                                                            // in considerazione
            $scope.classified.user.email = 'dummy@user.com'; // non viene preso
                                                              // in
                                                              // considerazione
          });

          $scope.response = false;
          $scope.error = function(data) {
            $scope.response = false; // reset response
            $scope.response = 'message' in data ? data
                : {
              status : 'danger',
              message : 'Errore di sistema, FORSE non hai cliccato il tasto per effettuare' +
                      'l\'upload delle immagini. Se il problema persiste contatta l\'assistenza'
            };
            angular.element('html, body').animate({
              scrollTop : 0
            }, 'slow');
            angular.element('#classified').unblock();
          };

          $scope.locationNotReady = function() {
            try {
              return !Boolean($scope.classified.location.value);
            } catch (e) {
              return true;
            }
          };

          $scope.isUnchanged = function(classified) {
            return angular.equals(classified, $scope.classified);
          };

          $scope.isInvalidCategory = function() {
            if ($scope.classified.category.value) {
              return false;
            }
            return true;
          };

          $scope.activated = false;
          $scope.activate = function(classified) {
            if (!classified && 'id' in classified) {
              return false;
            }

            Classified.disableEnable({
              'id' : classified.id
            }, function(data) {
              if ('status' in data && 'success' === data.status) {
                $scope.activated = true;
              }
            }, function() {
            });
            return false;
          };

          $scope.prepareRequestParams = function(scope) {
            angular.element('#classified').block({
              message : '<div>Loading</div>'
            });

            var children = [];
            for ( var i in scope.queue) {
              children[i] = {
                content : scope.queue[i].hashId
              };
            }

            var metadata = [
                {
                  key : 'cellulare',
                  value : 'mobile' in scope.classified ? scope.classified.mobile
                      : ''
                },
                {
                  key : 'hidemobile',
                  value : 'hidemobile' in scope.classified ? scope.classified.hidemobile
                      : ''
                },
                {
                  key : 'finalita',
                  value : 'purpose' in scope.classified ? scope.classified.purpose
                      : ''
                },
                {
                  key : 'prezzo',
                  value : 'price' in scope.classified ? scope.classified.price
                      : ''
                }
              ];

            // @todo: semplificare usando metamap e prenendo l'ordine dal dom
            var categoryMetadata = [];
            var c = null !== scope.classified.category ? scope.classified.category.value
                : '0';
            switch (c) {
            case '26': // auto
              categoryMetadata = [
                  {
                    key : 'tipo_contratto',
                    value : 'contracttype' in scope.classified &&
                        null !== scope.classified.contracttype ? scope.classified.contracttype.value
                        : ''
                  },
                  {
                    key : 'comune',
                    value : 'comune' in scope.classified &&
                        null !== scope.classified.comune ? scope.classified.comune.value
                        : ''
                  },
                  {
                    key : 'cambio',
                    value : 'cambio' in scope.classified &&
                        null !== scope.classified.cambio ? scope.classified.cambio.value
                        : ''
                  },
                  {
                    key : 'tipo_auto',
                    value : 'cartype' in scope.classified &&
                        null !== scope.classified.cartype ? scope.classified.cartype.value
                        : ''
                  },
                  {
                    key : 'kilometri',
                    value : 'kilometri' in scope.classified ? scope.classified.kilometri
                        : ''
                  },
                  {
                    key : 'marca_auto',
                    value : 'carbrand' in scope.classified &&
                        null !== scope.classified.carbrand ? scope.classified.carbrand.value
                        : ''
                  },
                  {
                    key : 'indirizzo',
                    value : 'address' in scope.classified &&
                        null !== scope.classified.address ? scope.classified.address
                        : ''
                  },
                  {
                    key : 'carburante',
                    value : 'fuel' in scope.classified &&
                        null !== scope.classified.fuel ? scope.classified.fuel.value
                        : ''
                  },
                  {
                    key : 'riferimento',
                    value : 'reference' in scope.classified ? scope.classified.reference
                        : ''
                  },
                  {
                    key : 'condizioni_auto',
                    value : 'carcondition' in scope.classified &&
                        null !== scope.classified.carcondition ? scope.classified.carcondition.value
                        : ''
                  },
                  {
                    key : 'classe_euro',
                    value : 'euroclass' in scope.classified &&
                        null !== scope.classified.euroclass ? scope.classified.euroclass.value
                        : ''
                  },
                  {
                    key : 'civico',
                    value : 'civic' in scope.classified ? scope.classified.civic
                        : ''
                  },
                  {
                    key : 'immatricolazione',
                    value : 'registration' in scope.classified ? scope.classified.registration
                        : ''
                  }
                ];
              break;
            case '27': // moto e scooter
              categoryMetadata = [
                  {
                    key : 'tipo_contratto',
                    value : 'contracttype' in scope.classified &&
                        null !== scope.classified.contracttype ? scope.classified.contracttype.value
                        : ''
                  },
                  {
                    key : 'marca_moto',
                    value : 'motobrand' in scope.classified &&
                        null !== scope.classified.motobrand ? scope.classified.motobrand.value
                        : ''
                  },
                  {
                    key : 'condizioni_moto',
                    value : 'motocondition' in scope.classified &&
                        null !== scope.classified.motocondition ? scope.classified.motocondition.value
                        : ''
                  },
                  {
                    key : 'comune',
                    value : 'comune' in scope.classified &&
                        null !== scope.classified.comune ? scope.classified.comune.value
                        : ''
                  },
                  {
                    key : 'indirizzo',
                    value : 'address' in scope.classified &&
                        null !== scope.classified.address ? scope.classified.address
                        : ''
                  },
                  {
                    key : 'civico',
                    value : 'civic' in scope.classified ? scope.classified.civic
                        : ''
                  },
                  {
                    key : 'cilindrata',
                    value : 'displacement' in scope.classified &&
                        null !== scope.classified.displacement ? scope.classified.displacement.value
                        : ''
                  },
                  {
                    key : 'riferimento',
                    value : 'reference' in scope.classified ? scope.classified.reference
                        : ''
                  },
                  {
                    key : 'cambio',
                    value : 'cambio' in scope.classified &&
                        null !== scope.classified.cambio ? scope.classified.cambio.value
                        : ''
                  },
                  {
                    key : 'tipo_moto',
                    value : 'mototype' in scope.classified &&
                        null !== scope.classified.mototype ? scope.classified.mototype.value
                        : ''
                  },
                  {
                    key : 'carburante',
                    value : 'fuel' in scope.classified &&
                        null !== scope.classified.fuel ? scope.classified.fuel.value
                        : ''
                  },
                  {
                    key : 'immatricolazione',
                    value : 'registration' in scope.classified ? scope.classified.registration
                        : ''
                  },
                  {
                    key : 'kilometri',
                    value : 'kilometri' in scope.classified ? scope.classified.kilometri
                        : ''
                  }
                ];
              break;
            case '106': // nautica
              categoryMetadata = [
                  {
                    key : 'tipo_contratto',
                    value : 'contracttype' in scope.classified &&
                        null !== scope.classified.contracttype ? scope.classified.contracttype.value
                        : ''
                  },
                  {
                    key : 'tipo_barca',
                    value : 'boattype' in scope.classified &&
                        null !== scope.classified.boattype ? scope.classified.boattype.value
                        : ''
                  },
                  {
                    key : 'carburante',
                    value : 'fuel' in scope.classified &&
                        null !== scope.classified.fuel ? scope.classified.fuel.value
                        : ''
                  },
                  {
                    key : 'comune',
                    value : 'comune' in scope.classified &&
                        null !== scope.classified.comune ? scope.classified.comune.value
                        : ''
                  },
                  {
                    key : 'indirizzo',
                    value : 'address' in scope.classified ? scope.classified.address
                        : ''
                  },
                  {
                    key : 'civico',
                    value : 'civic' in scope.classified ? scope.classified.civic
                        : ''
                  },
                  {
                    key : 'immatricolazione',
                    value : 'registration' in scope.classified ? scope.classified.registration
                        : ''
                  },
                  {
                    key : 'kilometri',
                    value : 'kilometri' in scope.classified ? scope.classified.kilometri
                        : ''
                  },
                  {
                    key : 'riferimento',
                    value : 'reference' in scope.classified ? scope.classified.reference
                        : ''
                  }
                ];
              break;
            case '118': // caravan e camper
              categoryMetadata = [
                  {
                    key : 'tipo_contratto',
                    value : 'contracttype' in scope.classified &&
                        null !== scope.classified.contracttype ? scope.classified.contracttype.value
                        : ''
                  },
                  {
                    key : 'tipo_caravan',
                    value : 'campertype' in scope.classified &&
                        null !== scope.classified.campertype ? scope.classified.campertype.value
                        : ''
                  },
                  {
                    key : 'carburante',
                    value : 'fuel' in scope.classified &&
                        null !== scope.classified.fuel ? scope.classified.fuel.value
                        : ''
                  },
                  {
                    key : 'comune',
                    value : 'comune' in scope.classified &&
                        null !== scope.classified.comune ? scope.classified.comune.value
                        : ''
                  },
                  {
                    key : 'indirizzo',
                    value : 'address' in scope.classified ? scope.classified.address
                        : ''
                  },
                  {
                    key : 'civico',
                    value : 'civic' in scope.classified ? scope.classified.civic
                        : ''
                  },
                  {
                    key : 'immatricolazione',
                    value : 'registration' in scope.classified ? scope.classified.registration
                        : ''
                  },
                  {
                    key : 'kilometri',
                    value : 'kilometri' in scope.classified ? scope.classified.kilometri
                        : ''
                  },
                  {
                    key : 'riferimento',
                    value : 'reference' in scope.classified ? scope.classified.reference
                        : ''
                  }
                ];
              break;
            case '109': // appartamenti
            case '110': // ville
            case '35': // uffici e locali commerciali
              categoryMetadata = [
                  {
                    key : 'tipo_contratto',
                    value : 'contracttype' in scope.classified &&
                        null !== scope.classified.contracttype ? scope.classified.contracttype.value
                        : ''
                  },
                  {
                    key : 'numero_stanze',
                    value : 'room' in scope.classified &&
                        null !== scope.classified.room ? scope.classified.room.value
                        : ''
                  },
                  {
                    key : 'metri_quadri',
                    value : 'areasm' in scope.classified ? scope.classified.areasm
                        : ''
                  },
                  {
                    key : 'comune',
                    value : 'comune' in scope.classified &&
                        null !== scope.classified.comune ? scope.classified.comune.value
                        : ''
                  },
                  {
                    key : 'indirizzo',
                    value : 'address' in scope.classified ? scope.classified.address
                        : ''
                  },
                  {
                    key : 'civico',
                    value : 'civic' in scope.classified ? scope.classified.civic
                        : ''
                  },
                  {
                    key : 'box',
                    value : 'carbox' in scope.classified &&
                        null !== scope.classified.carbox ? scope.classified.carbox.value
                        : ''
                  },
                  {
                    key : 'boxmq',
                    value : 'areasmbox' in scope.classified ? scope.classified.areasmbox
                        : ''
                  },
                  {
                    key : 'anno_costruzione',
                    value : 'constructionyear' in scope.classified ? scope.classified.constructionyear
                        : ''
                  },
                  {
                    key : 'giardino',
                    value : 'garden' in scope.classified &&
                        null !== scope.classified.garden ? scope.classified.garden.value
                        : ''
                  },
                  {
                    key : 'giardinomq',
                    value : 'areasmgarden' in scope.classified ? scope.classified.areasmgarden
                        : ''
                  },
                  {
                    key : 'unita_immobiliare',
                    value : 'realestateunit' in scope.classified ? scope.classified.realestateunit
                        : ''
                  },
                  {
                    key : 'piano',
                    value : 'floor' in scope.classified &&
                        null !== scope.classified.floor ? scope.classified.floor.value
                        : ''
                  },
                  {
                    key : 'totale_piani',
                    value : 'floortotal' in scope.classified ? scope.classified.floortotal
                        : ''
                  },
                  {
                    key : 'spese_mensili',
                    value : 'montlyexpenses' in scope.classified ? scope.classified.montlyexpenses
                        : ''
                  },
                  {
                    key : 'condizioni',
                    value : 'condition' in scope.classified &&
                        null !== scope.classified.condition ? scope.classified.condition.value
                        : ''
                  },
                  {
                    key : 'rogito',
                    value : 'deed' in scope.classified &&
                        null !== scope.classified.deed ? scope.classified.deed.value
                        : ''
                  },
                  {
                    key : 'riferimento',
                    value : 'reference' in scope.classified ? scope.classified.reference
                        : ''
                  },
                  {
                    key : 'balcone',
                    value : 'balcony' in scope.classified ? scope.classified.balcony
                        : ''
                  },
                  {
                    key : 'terrazzo',
                    value : 'terrace' in scope.classified ? scope.classified.terrace
                        : ''
                  },
                  {
                    key : 'ascensore',
                    value : 'lift' in scope.classified ? scope.classified.lift
                        : ''
                  },
                  {
                    key : 'riscaldamento',
                    value : 'heating' in scope.classified &&
                        null !== scope.classified.heating ? scope.classified.heating.value
                        : ''
                  },
                  {
                    key : 'numero_bagni',
                    value : 'bathroom' in scope.classified &&
                        null !== scope.classified.bathroom ? scope.classified.bathroom.value
                        : ''
                  }
                ];
              break;
            case '32': // camera, posto letto
              categoryMetadata = [
                  {
                    key : 'comune',
                    value : 'comune' in scope.classified &&
                        null !== scope.classified.comune ? scope.classified.comune.value
                        : ''
                  },
                  {
                    key : 'indirizzo',
                    value : 'address' in scope.classified &&
                        null !== scope.classified.address ? scope.classified.address.value
                        : ''
                  },
                  {
                    key : 'civico',
                    value : 'civic' in scope.classified ? scope.classified.civic
                        : ''
                  },
                  {
                    key : 'fumatori',
                    value : 'smoker' in scope.classified &&
                        null !== scope.classified.smoker ? scope.classified.smoker.value
                        : ''
                  },
                  {
                    key : 'tipo_stanza',
                    value : 'roomtype' in scope.classified &&
                        null !== scope.classified.roomtype ? scope.classified.roomtype.value
                        : ''
                  },
                  {
                    key : 'affittasi_a',
                    value : 'rentto' in scope.classified &&
                        null !== scope.classified.rentto ? scope.classified.rentto.value
                        : ''
                  },
                  {
                    key : 'riferimento',
                    value : 'reference' in scope.classified ? scope.classified.reference
                        : ''
                  },
                  {
                    key : 'balcone',
                    value : 'balcony' in scope.classified ? scope.classified.balcony
                        : ''
                  }
                ];
              break;
            case '33': // camera, posto letto
            case '34': // box e garage
            case '37': // altri immobili
              categoryMetadata = [
                  {
                    key : 'comune',
                    value : 'comune' in scope.classified &&
                        null !== scope.classified.comune ? scope.classified.comune.value
                        : ''
                  },
                  {
                    key : 'indirizzo',
                    value : 'address' in scope.classified &&
                        null !== scope.classified.address ? scope.classified.address.value
                        : ''
                  },
                  {
                    key : 'civico',
                    value : 'civic' in scope.classified ? scope.classified.civic
                        : ''
                  },
                  {
                    key : 'tipo_contratto',
                    value : 'contracttype' in scope.classified &&
                        null !== scope.classified.contracttype ? scope.classified.contracttype.value
                        : ''
                  },
                  {
                    key : 'metri_quadri',
                    value : 'areasm' in scope.classified ? scope.classified.areasm
                        : ''
                  },
                  {
                    key : 'riferimento',
                    value : 'reference' in scope.classified ? scope.classified.reference
                        : ''
                  }
                ];
              break;
            case '36': // case vacanza
              categoryMetadata = [
                  {
                    key : 'comune',
                    value : 'comune' in scope.classified &&
                        null !== scope.classified.comune ? scope.classified.comune.value
                        : ''
                  },
                  {
                    key : 'indirizzo',
                    value : 'address' in scope.classified &&
                        null !== scope.classified.address ? scope.classified.address.value
                        : ''
                  },
                  {
                    key : 'civico',
                    value : 'civic' in scope.classified ? scope.classified.civic
                        : ''
                  },
                  {
                    key : 'giardino',
                    value : 'garden' in scope.classified &&
                        null !== scope.classified.garden ? scope.classified.garden.value
                        : ''
                  },
                  {
                    key : 'numero_stanze',
                    value : 'room' in scope.classified &&
                        null !== scope.classified.room ? scope.classified.room.value
                        : ''
                  },
                  {
                    key : 'metri_quadri',
                    value : 'areasm' in scope.classified ? scope.classified.areasm
                        : ''
                  },
                  {
                    key : 'numero_bagni',
                    value : 'bathroom' in scope.classified &&
                        null !== scope.classified.bathroom ? scope.classified.bathroom.value
                        : ''
                  },
                  {
                    key : 'piano',
                    value : 'floor' in scope.classified &&
                        null !== scope.classified.floor ? scope.classified.floor.value
                        : ''
                  },
                  {
                    key : 'riferimento',
                    value : 'reference' in scope.classified ? scope.classified.reference
                        : ''
                  },
                  {
                    key : 'balcone',
                    value : 'balcony' in scope.classified ? scope.classified.balcony
                        : ''
                  },
                  {
                    key : 'terrazzo',
                    value : 'terrace' in scope.classified ? scope.classified.terrace
                        : ''
                  },
                  {
                    key : 'ascensore',
                    value : 'lift' in scope.classified ? scope.classified.lift
                        : ''
                  }
                ];
              break;
            case '61': // offerte lavoro
            case '62': // cerco lavoro
              categoryMetadata = [
                  {
                    key : 'contratto_lavoro',
                    value : 'jobcontracttype' in scope.classified &&
                        null !== scope.classified.jobcontracttype ? scope.classified.jobcontracttype.value
                        : ''
                  },
                  {
                    key : 'orario_lavoro',
                    value : 'workinghours' in scope.classified &&
                        null !== scope.classified.workinghours ? scope.classified.workinghours.value
                        : ''
                  },
                  {
                    key : 'inquadramento_lavoro',
                    value : 'jobtype' in scope.classified &&
                        null !== scope.classified.jobtype ? scope.classified.jobtype.value
                        : ''
                  }
                ];
              break;
            }
            metadata = metadata.concat(categoryMetadata);

            return {
              user : scope.classified.user,
              document : {
                id : scope.classified.id,
                title : scope.classified.title,
                content : scope.classified.content,
                location : 'location' in scope.classified ? scope.classified.location.value
                    : {},
                metadata : metadata,
                children : children,
                termTaxonomy : [ {
                  termTaxonomyId : scope.classified.category.value
                }]
              }
            };
          };

          //	  $scope.doSubmit = function() {
          //		  var params = $scope.prepareRequestParams()
          //		  var classified = new Classified(params);
          //		  classified.$save();
          //	  }

          // @todo se è loggato non cambiare il template, aggiungere loading di attesa salvataggio
          $scope.getTemplateUrl = function() {
            if ($scope.sent && $rootScope.logged) {
              if ($rootScope.isEdit) {
                return '/app/views/loggedin/add-classified-sent-edit.html';
              } else {
                return '/app/views/loggedin/add-classified-sent-insert.html';
              }
            }
            if ($scope.sent && !$rootScope.logged) {
              return '/app/views/loggedout/add-classified-sent.html';
            }
            return '/app/views/add-classified.html';
          };

          //	  $scope.uploadFinished = function(e, data) {
          //		  console.log('We just finished uploading this baby...');
          //		  }; 
        }).controller('FileDestroyController',
        [ '$scope', '$http', function($scope, $http) {
          var file = $scope.file, state;

          if ($scope.queue.length > 5) {
            $scope.clear(file);
            return false;
          }

          if (file.url) {
            file.$state = function() {
              return state;
            };

            file.$destroy = function() {
              state = 'pending';
              return $http({
                url : file.deleteUrl,
                method : file.deleteType
              }).then(function() {
                state = 'resolved';
                $scope.clear(file);
                $scope.$emit('fileuploadremoved');
                $scope.$emit('queuecheck', $scope.queue);
              }, function() {
                state = 'rejected';
              });
            };
          } else if (!file.$cancel && !file._index) {
            file.$cancel = function() {
              $scope.clear(file);
            };
          }
        } ]);