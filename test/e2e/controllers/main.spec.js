'use strict';

describe("E2E: Testing homepage", function() {
  var ptor;

  beforeEach(function() {
    var httpBackendMock = function() {
      angular.module('httpBackendMock', ['ngMockE2E'])
        .run(function($httpBackend) {
          var authenticated = false;
          var testAccount = {
            email: 'test@example.com'
          };

          $httpBackend.whenPOST('http://127.0.0.1:9000/user/login').respond(function(method, url, data, headers) {
            authenticated = false;
            return [500, '{"status":"danger","message":"Nessun utente corrisponde alle credenziali inviate"}', {}];
          });
          
          $httpBackend.whenGET('http://www.neobazaar.com/classified?category=usato&location=italia&purpose=compravendita').respond(function(method, url, data, headers) {
            return [200, '{"data":[{"hashId":"49d660728c40edd2b214d2cc4d175b0f1286f114","title":"ADDETTI TELEFONICI","price":"","priceFormatted":"Contatta l\u0027inserzionista","meta":{"contratto_lavoro":{"id":"contratto_lavoro","key":"Contratto lavoro","value":"progetto"},"orario_lavoro":{"id":"orario_lavoro","key":"Orario lavoro","value":"part"},"inquadramento_lavoro":{"id":"inquadramento_lavoro","key":"Inquadramento lavoro","value":"altro"}},"date":"Oggi alle 17:59:00","image":{"class":"","alt":"","src":"\/ups\/2014\/03\/13\/150_f075b0_logomediadefinizione.JPG"},"images":[{"hashId":"7681a1685568a3a72b6e34243695e85c393bc92a","class":"","alt":"","name":"f075b0_logomediadefinizione.JPG","size":46,"url":"\/ups\/2014\/03\/13\/f075b0_logomediadefinizione.JPG","path":"\/www\/neobazaar.com\/www\/ups\/2014\/03\/13\/f075b0_logomediadefinizione.JPG","thumbnailUrl":"\/ups\/2014\/03\/13\/150_f075b0_logomediadefinizione.JPG","thumbnailPath":"\/www\/neobazaar.com\/www\/ups\/2014\/03\/13\/150_f075b0_logomediadefinizione.JPG","deleteUrl":"\/image\/7681a1685568a3a72b6e34243695e85c393bc92a","deleteType":"DELETE"}],"content":"Visiant Contact \u00e8 una societ\u00e0 italiana leader nel settore Call Center\n\nPer la propria sede di SALERNO\n\nricerca\n\nADDETTI TELEFONICI\n\n\nSi richiedono\n\u2022\tbuona conoscenza dei principali strumenti informatici;\n\u2022 ottime capacit\u00e0 comunicative;\n\u2022 forte motivazione e orientamento al raggiungimento dei risultati;\n\nSi offre:\n\n\u2022 un tutor dedicato e formazione continua;\n\u2022 flessibilit\u00e0 oraria ed organizzativa;  \n\u2022 contratto a norma di legge, part-time\n\u2022\tcompenso fisso garantito (retribuzione oraria  legata al 2\u00b0 livello CCNL) \n\u2022\t incentivi premianti al raggiungimento di obiettivi di vendita\n\n\nLa ricerca ha carattere di urgenza e si rivolge a candidati di ambo i sessi (L. 903\/77)","dateInsert":"2014\/03\/13 17:57:24","visited":0,"isActive":true,"isDeactive":false,"isDeleted":false,"cssClass":"","purpose":"vendita","mobile":"0899929625","hidemobile":"YES","location":"provincia-salerno","locationFormatted":"Salerno","categories":"Offerte di lavoro, Lavoro","category":"offerte-di-lavoro","slug":"84f9f9_addetti-telefonici","address":"http:\/\/www.neobazaar.com\/#\/ads\/offerte-di-lavoro\/84f9f9_addetti-telefonici\/49d660728c40edd2b214d2cc4d175b0f1286f114.html","editaddress":"\/#\/edit-classified\/49d660728c40edd2b214d2cc4d175b0f1286f114","activationaddress":"http:\/\/www.neobazaar.com\/#\/activation\/49d660728c40edd2b214d2cc4d175b0f1286f114","userId":"8c5064a60e301e824266fd316dee875d4863828b","fullname":" ","insert":"Oggi alle 17:59:00","longitude":15.2667,"latitude":40.45,"breadcrumbs":"\u003Ca href=\u0027#\/\u0027\u003ENeobazaar.com\u003C\/a\u003E \u003E \u003Ca href=\u0027#\/annunci-italia\u0027\u003ETutti gli annunci\u003C\/a\u003E \u003E \u003Ca href=\u0027#\/annunci-provincia-salerno\u0027\u003ESalerno\u003C\/a\u003E\u003Ca href=\u0027#\/annunci-provincia-salerno\/vendita\u0027\u003E, in Vendita\u003C\/a\u003E \u003E \u003Ca href=\u0027#\/annunci-provincia-salerno\/vendita\/offerte-di-lavoro\u0027\u003EOfferte di lavoro\u003C\/a\u003E \u003E ADDETTI TELEFONICI","state":1,"stateFormatted":"Attivo","stateClass":"success","count":"disabled","nl2brContent":"Visiant Contact \u00e8 una societ\u00e0 italiana leader nel settore Call Center\u003Cbr \/\u003E\n\u003Cbr \/\u003E\nPer la propria sede di SALERNO\u003Cbr \/\u003E\n\u003Cbr \/\u003E\nricerca\u003Cbr \/\u003E\n\u003Cbr \/\u003E\nADDETTI TELEFONICI\u003Cbr \/\u003E\n\u003Cbr \/\u003E\n\u003Cbr \/\u003E\nSi richiedono\u003Cbr \/\u003E\n\u2022\tbuona conoscenza dei principali strumenti informatici;\u003Cbr \/\u003E\n\u2022 ottime capacit\u00e0 comunicative;\u003Cbr \/\u003E\n\u2022 forte motivazione e orientamento al raggiungimento dei risultati;\u003Cbr \/\u003E\n\u003Cbr \/\u003E\nSi offre:\u003Cbr \/\u003E\n\u003Cbr \/\u003E\n\u2022 un tutor dedicato e formazione continua;\u003Cbr \/\u003E\n\u2022 flessibilit\u00e0 oraria ed organizzativa;  \u003Cbr \/\u003E\n\u2022 contratto a norma di legge, part-time\u003Cbr \/\u003E\n\u2022\tcompenso fisso garantito (retribuzione oraria  legata al 2\u00b0 livello CCNL) \u003Cbr \/\u003E\n\u2022\t incentivi premianti al raggiungimento di obiettivi di vendita\u003Cbr \/\u003E\n\u003Cbr \/\u003E\n\u003Cbr \/\u003E\nLa ricerca ha carattere di urgenza e si rivolge a candidati di ambo i sessi (L. 903\/77)","isExpired":false}]}', {}]
          });
          //$httpBackend.whenGET(/.*/).passThrough();
        })
    };
    ptor = protractor.getInstance();
    //ptor.addMockModule('httpBackendMock', httpBackendMock);
  });
  
  it('should load the homepage', function() {
    browser.get('/');
    //expect(element('h4:first').html()).toContain('»  Compra');
    //expect(element('.adm1 li:first a').html()).toContain('Tutta Italia');
    var ele = by.id('Map');
    expect(ptor.isElementPresent(ele)).toBe(true);
  });
  
  it('should load login page, check on element existence', function() {
    element(by.id('loginBtn')).click();
    var loginErrorMessage = by.id('loginErrorMessage');
    expect(ptor.isElementPresent(by.id('Map'))).toBe(false);
    expect(ptor.isElementPresent(loginErrorMessage)).toBe(true);
  });
  
  it('should have error message to be hidden', function() {  
    var loginErrorMessage = by.id('loginErrorMessage');
    expect(ptor.findElement(loginErrorMessage).isDisplayed()).toBe(false);
  });
  
  it('should display error messagge for invalid credential', function() { 
    var loginErrorMessage = by.id('loginErrorMessage');
    element(by.input('params.identity')).sendKeys('angular/angular.js');
    element(by.input('params.credential')).sendKeys('angular/angular.js');
    element(by.id('doLoginBtn')).click();
    //expect(ptor.findElement(loginErrorMessage).isDisplayed()).toBe(true);
  });
  
  it('should display go back home', function() { 
    element(by.id('logoBtn')).click();
    expect(ptor.isElementPresent(by.id('Map'))).toBe(true);
  });
  
  it('should display display classified list', function() { 
    element(by.id('italy')).click();
  });
  
  it('search form must be present', function() { 
    expect(ptor.isElementPresent(by.id('search'))).toBe(true);
  });
});

