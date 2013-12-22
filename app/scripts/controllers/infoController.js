'use strict';

angular
    .module('Neobazaar')
    .controller(
        'InfoController',
        function($scope, $location) {

          var page = ($location.path()).substring(1).toLowerCase();
          $scope.resource = {};
          $scope.resource.data = {};
          $scope.resource.data.path = page;

          switch (page) {
          case 'privacy':
            $scope.resource.data = {
              'title' : 'Informativa sulla privacy',
              'content' : '' +
                  '<p>(Decreto Legislativo n. 196 del 30 giugno 2003)</p>' +

                  '<p>Il Decreto Legislativo n. 196 del 30 giugno 2003 ha la finalità di garantire che il ' +
                  'trattamento dei Suoi dati personali si svolga nel rispetto dei diritti, delle libertà ' +
                  'fondamentali e della dignità delle persone, con particolare riferimento alla ' +
                  'riservatezza e all\'identità personale.</p>' +

                  '<p>La informiamo, ai sensi dellart. 13 del Codice in materia di protezione dei dati ' +
                  'personali, che i dati personali da Lei forniti all\'atto della registrazione al Servizio' +
                  'ovvero altrimenti acquisiti nell\'ambito dell\'attività da noi svolta, potranno formare ' +
                  'oggetto di trattamento, per le finalità connesse alla fornitura del Servizio medesimo. ' +
                  'Per trattamento di dati personali si intende la loro raccolta, registrazione, ' +
                  'organizzazione, conservazione, elaborazione, modificazione, selezione, estrazione, ' +
                  'raffronto, utilizzo, diffusione, cancellazione, distribuzione, interconnessione e ' +
                  'quant\'altro sia utile per l\'esecuzione del Servizio, compresa la combinazione di due o ' +
                  'più di tali operazioni.</p>' +

                  '<p>Il conferimento dei dati personali da parte Sua è assolutamente facoltativo; tuttavia ' +
                  'l\'eventuale rifiuto ad inserirli nella pagina di inserimento annuncio o dedicata al suo ' +
                  'profilo utente potrebbe rendere impossibile l\'utilizzo del Servizio offerto nell\'ambito ' +
                  'del sito web www.neobazaar.com.</p>' +

                  '<p>In particolare, il trattamento dei Suoi dati, oltre alle finalità connesse, ' +
                  'strumentali e necessarie alla fornitura del Servizio sara finalizzato a:</p>' +

                  '<ul>' +
                  '<li>a) raccogliere dati ed informazioni in via generale e particolare sui Suoi orientamenti ' +
                  'e/o preferenze; inviare informazioni ed offerte commerciali, anche di terzi; inviare ' +
                  'materiale pubblicitario e informativo; effettuare comunicazioni commerciali, anche ' +
                  'interattive; cedere a terzi i dati raccolti ed elaborati a fini commerciali anche ' +
                  'per la vendita o tentata vendita, ovvero per tutte quelle finalità a carattere ' +
                  'commerciale e/o statistico lecite;</li>' +

                  '<li>b) comunicare i dati a Società che svolgono funzioni strettamente connesse e strumentali' +
                  'all\'operatività del Servizio;</li>' +

                  '<li>c) trasferire i dati verso società collegate e/o facenti parte del medesimo gruppo di ' +
                  'Neobazaar.com.</li>' +
                  '</ul>' +

                  '<p>Il conferimento del consenso al trattamento dei propri dati personali da parte Sua è ' +
                  'facoltativo. Peraltro, in caso di Suo rifiuto, non potrà accedere al Servizio. ' +
                  'Il trattamento dei Suoi dati per le finalità sopraindicate avrà luogo prevalentemente ' +
                  'con modalità automatizzate ed informatizzate, sempre nel rispetto delle regole di ' +
                  'riservatezza e di sicurezza previste dalla legge. I dati saranno conservati per i ' +
                  'termini di legge presso la sede della titolare e trattati da parte di dipendenti ' +
                  'e/o professionisti da questa incaricati, i quali svolgono le suddette attività sotto ' +
                  'la loro diretta supervisione e responsabilità.</p>' +

                  '<p>Il titolare del trattamento dei dati personali è Neobazaar.com, responsabile del ' +
                  'trattamento sono i dipendenti e/o professionisti incaricati dal Titolare, i quali ' +
                  'svolgono le suddette attività sotto la sua diretta supervisione e responsabilità.</p>' +

                  '<p>La informiamo, inoltre, che potrà consultare, modificare, opporsi o far cancellare i ' +
                  'Suoi dati o comunque esercitare tutti i diritti che Le sono riconosciuti ai sensi ' +
                  'dell\'art. 7 del Codice in materia di protezione dei dati personali, inviando una ' +
                  'e-mail al nostro indirizzo info@neobazaar.com o accedendo al suo account utente ' +
                  'ed utilizzando l\'apposita sezione per l\'eliminazione automatica del proprio account.</p>' +

                  '<p>Se vuole consultare il testo completo del Codice in materia di protezione dei dati ' +
                  'personali, visiti il sito ufficiale dell\'Autorità Garante www.garanteprivacy.it</p>'
            };
            break;
          case 'conditions':
            $scope.resource.data = {
              'title' : 'Condizioni d\'uso',
              'content' : '' +
                  '<p>Benvenuto su www.neobazaar.com, di seguito \'Neobazaar\'. ' +
                  'Nelle presenti Condizioni di uso sono indicate le norme che regolano i servizi offerti ' +
                  'da Neobazaar. Queste regole sono aggiornate al 12/11/2013.</p>' +

                  '<p>Regole per l\'utilizzo del servizio offerto da Neobazaar</p>' +

                  '<p>Inserendo un annuncio su Neobazaar ti impegni a pubblicare il tuo annuncio nella categoria ' +
                  'più appropriate del nostro sito e a non compiere le seguenti attività:</p>' +

                  '<ul>' +
                  '<li>violare le leggi in vigore o le nostre Regole sui contenuti proibiti;</li>' +
                  '<li>pubblicare annunci contenenti informazioni false o ingannevoli;</li>' +

                  '<li>pubblicare annunci in violazione dei diritti di proprietà intellettuale di terzi;</li>' +

                  '<li>pubblicare lo stesso annuncio più volte in città differenti: questo comportamento causerà ' +
                  'la rimozione immediata di tutti gli annunci inseriti.</li>' +

                  '<li>utilizzare il servizio offerto su Neobazaar al fine di inviare \'spam\' o proposte di schemi ' +
                  'piramidali;</li>' +

                  '<li>diffondere virus informatici o altre tecnologie in grado di danneggiare Neobazaar o gli ' +
                  'utenti di Neobazaar;</li>' +

                  '<li>compiere azioni che possano causare un irragionevole sovraccarico alle nostre infrastrutture ' +
                  'tecnologiche e al nostro sito;</li>' +

                  '<li>copiare, riprodurre, alterare, modificare o diffondere i contenuti pubblicati dagli ' +
                  'inserzionisti senza il loro consenso espresso;</li>' +

                  '<li>utilizzare qualsiasi robot, spider, scraper o altri strumenti automatici per accedere a ' +
                  'Neobazaar e raccogliere contenuti ed informazioni per qualsiasi scopo senza il nostro previo ' +
                  'consenso scritto;</li>' +

                  '<li>raccogliere informazioni personali di altri utenti, incluso il loro indirizzo email, senza ' +
                  'il loro consenso;</li>' +

                  '<li>aggirare le misure adottate al fine di prevenire o limitare l\'accesso a Neobazaar.</li>' +

                  '<li>Inserire annunci il cui contenuto costituisca reato perseguibile penalmente: diffamazione, ' +
                  'violazione della privacy, sfruttamento o favoreggiamento della prostituzione, diffusione di ' +
                  'materiale pedopornografico sono reati perseguibili dalla legge, questo genere di annunci sarà ' +
                  'segnalato alle autorità.</li>' +

                  '<li>Non sono consentiti annunci di prestazioni sessuali, siano esse a pagamento o no, questo genere ' +
                  'di annunci sarà immediatamente eliminato.</li>' +

                  '<li>Non è consentito inserire annunci di escort, accompagnatrici, accompagnatori, ' +
                  'gigolò o simili.</li>' +

                  '<li>Testi e immagini non devono essere volgari e/o offensivi. Qualsisi annuncio contenente ' +
                  'immagini pornografiche sarà eliminato.' +

                  '<li>Le immagini allegate agli annunci devono rispecchiare il contenuto testuale dell\'annuncio, ' +
                  'pena l\'eliminazione dell\'immagine o dell\'annuncio stesso.' +

                  '<li>Sono vietati servizi 899 e simili.</li>' +
                  '</ul>' +

                  '<h3>Prodotti e servizi illegali</h3>' +
                  '<p>I seguenti prodotti e/o servizi sono vietati dalla legge italiana. Annunci contenenti questo ' +
                  'genere di contenuti non devono essere inseriti.</p>' +

                  '<ul>' +
                  '<li>Organi, spoglie e materiale organico umano</li>' +
                  '<li>Materiale pedo-pornografico</li>' +
                  '<li>Gioco d’azzardo e scommesse</li>' +
                  '<li>Tabacchi</li>' +
                  '<li>Oggetti rubati</li>' +
                  '<li>Azioni e titoli</li>' +
                  '<li>Documenti d\'identità</li>' +
                  '<li>Strumenti per l\'apertura di serrature</li>' +
                  '<li>Droghe, sostanze stupefacenti</li>' +
                  '<li>Fuochi d\'artificio</li>' +
                  '<li>Pesticidi</li>' +
                  '<li>Armi da fuoco e da taglio, pistole e oggetti correlati</li>' +
                  '<li>Oggetti militari o appartenenti alle Forze dell’Ordine</li>' +
                  '<li>Farmaci</li>' +
                  '</ul>' +

                  '<h3>Regole relative ad alcune categorie</h3>' +
                  '<p>Qui di seguito sono presenti delle regole aggiuntive per alcune determinate categorie di ' +
                  'Neobazaar.</p>' +

                  '<ul>' +
                  '<li><strong>Lavoro e sottocategorie</strong>: ' +
                  '<p>Neobazaar richiede tassativamente il rispetto della Legge Biagi per ' +
                  'quanto concerne l\'inserimento di offerte di lavoro: In base al D.Lgs. N° 276 in vigore dal ' +
                  '24/10/2003 le inserzioni di ricerca del personale dovranno indicare il nominativo e/o ' +
                  'nell’ipotesi di persona giuridica la denominazione sociale di chi offre il lavoro. Sono ' +
                  'vietate tutte le comunicazioni relative ad attività di ricerca e selezione del personale, ' +
                  'ricollocamento professionale, intermediazione o somministrazione effettuate in forma anonima ' +
                  'e/o da soggetti, pubblici o privati, non autorizzati o accreditati all\'incontro tra domanda e ' +
                  'offerta di lavoro eccezione fatta per quelle comunicazioni che facciano esplicito riferimento ' +
                  'ai soggetti in questione, o entità ad essi collegate perchè facenti parte dello stesso gruppo ' +
                  'di imprese o in quanto controllati o controllanti, in quanto potenziali datori di lavoro. ' +
                  'Gli annunci pubblicati dai soggetti autorizzati allo svolgimento delle attività di ' +
                  'somministrazione, intermediazione, ricerca e selezione del personale e supporto alla ' +
                  'ricollocazione professionale dovranno riportare il numero di autorizzazione rilasciata dal ' +
                  'ministero e recare un facsimile di domanda, comprensivo dell\'informativa di cui all\'articolo ' +
                  '13 del decreto legislativo 30 giugno 2003, n. 196 (Legge sulla Privacy) oppure indicare un ' +
                  'link al sito della rete attraverso il quale il medesimo facsimile è conoscibile in modo ' +
                  'agevole.</p>' +

                  '<p>Neobazaar non accetta offerte di lavoro di multilevel marketing e non accetta in questa ' +
                  'categoria annunci comportanti prestazioni di nudo (modelle e strip) o prestazioni sessuali ' +
                  '(escort, massaggiatori).</p>' +

                  '<p>Neobazaar si riserva il diritto di cancellare ogni annuncio pubblicato non in conformità con ' +
                  'i requisiti qui riportati.</p></li>' +

                  '<li><strong>Incontri e sottocategorie</strong>: ' +
                  '<p>queste categorie sono riservate esclusivamente ad un pubblico ' +
                  'maggiorenne.</p></li>' +
                  '</ul>' +

                  '<h3>Violazione dei termini d\'uso</h3>' +
                  '<p>I titolari di Neobazaar.com non possono essere ritenuti ' +
                  'responsabili per un uso non autorizzato o illecito dei suoi servizi da parte degli utenti. ' +
                  'L\'inserimento degli annunci da parte degli utenti non è monitorato ne limitato. Ci riserviamo ' +
                  'il diritto di limitare o vietare i nostri servizi, rimuovere un contenuto da noi ospitato o ' +
                  'di adottare tutte le misure tecniche o legali per escludere dal nostro sito un utente, che ' +
                  'abbia avuto un comportamento contrario alle nostre Regole e/o a queste Condizioni di uso. ' +
                  'Invitiamo tutti gli utenti ad utilizzare l\'apposito sistema di segnalazione presente in ogni ' +
                  'annuncio nel caso si ritenga questo vìoli le regole.</p>' +

                  '<h3>Tariffe</h3>' +
                  '<p>Neobazaar è completamemnte gratuito. Tuttavia alcuni servizi potrebbero essere a ' +
                  'pagamento. Se il servizio che utilizzi è soggetto al pagamento di tariffe, ti sarà indicato ' +
                  'prima del suo utilizzo. Le eventuali tariffe saranno espresse in Euro e potranno essere ' +
                  'soggette a modifiche. Le tariffe non sono rimborsabili.</p>' +

                  '<h3>Proprietà dei contenuti</h3>' +
                  '<p>I contenuti pubblicati su Neobazaar sono di proprietà degli utenti.</p>' +
                  '<p>Approvando queste Condizioni d\'uso, ci autorizzi a pubblicare le informazioni da te fornite e ' +
                  'ci concedi una licenza di utilizzo a tempo indeterminato, irrevocabile, a titolo gratuito e ' +
                  'trasferibile, dei diritti di autore, degli altri diritti di proprietà intellettuale nonché dei ' +
                  'diritti d\'immagine da te goduti in relazione ai contenuti da te pubblicati su Neobazaar. ' +
                  'Questa licenza è necessaria al fine di ospitare e dare visibilità al contenuto da te pubblicato. ' +
                  'Se ritieni che un tuo diritto di proprietà intellettuale sia stato violato da un altro utente, ' +
                  'ti invitiamo a segnalarcelo. La tua segnalazione sarà verificata. Ci riserviamo il diritto di ' +
                  'rimuovere un contenuto se abbiamo il legittimo sospetto di essere in presenza di una violazione ' +
                  'delle presenti Condizioni d\'uso, delle nostre Regole, della legge e/o dei diritti di proprietà ' +
                  'intellettuale di terzi.</p>' +

                  '<h3>Infrazioni</h3>' +
                  '<p>Non inviare contenuti che violino i diritti di terzi, ivi incluse, ma non è limitato ' +
                  'a, contenuto che vìoli i diritti di proprietà intellettuale come diritto d\'autore e del ' +
                  'marchio ( ad esempio vendita di articoli contraffatti ). Gli aventi diritto, in particolare, ' +
                  'i proprietari dei diritti d\'autore, diritti di marchio o altri diritti di proprietà, possono ' +
                  'comunicare eventuali offerte che violìno i loro diritti e richiedere la loro rimozione ' +
                  'all\'indirizzo info@neobazaar.com.</p>' +

                  '<h3>Responsabilità</h3>' +
                  '<p>Il titolare dell\'annuncio dichiara, all\'atto dell\'inserimento nel sito ' +
                  'Neobazaar.com, di essere l\'unico responsabile per qualsiasi eventuale danno o lesione ' +
                  'causata dal contenuto dello stesso.</p>' +
                  '<p>Gli annunci ed eventuali successive comunicazioni tra gli utenti non sono monitorate da ' +
                  'Neobazaar.com quindi non è possibile garantire la qualità, la sicurezza, la legalità o di ' +
                  'ciò che è offerto.</p>' +

                  '<p>In nessun caso possiamo accettare la responsabilità di qualsiasi natura per la pubblicazione ' +
                  'di materiale illegale, minaccioso, abusivo, diffamatorio, osceno o indecente di informazioni ' +
                  'o di ogni altro materiale che violi i diritti di qualsiasi altra persona, compreso senza ' +
                  'limitazione, qualunque trasmissione che costituisca o incoraggi una condotta che potrebbe ' +
                  'costituire un reato penale, dar luogo a responsabilità civile o violare qualunque legge ' +
                  'applicabile.</p>' +

                  '<p>Non possiamo garantire l\'accesso continuo, senza errori e sicuro ai nostri servizi o che i ' +
                  'difetti del servizio verranno corretti. Nonostante faremo tutti gli sforzi ragionevoli per ' +
                  'mantenere un servizio ininterrotto, non possiamo garantirlo e non diamo alcuna promessa o ' +
                  'garanzia (esplicita o implicita) circa la disponibilità dei nostri servizi.</p>' +

                  '<p>Di conseguenza, per quanto legalmente consentito, decliniamo espressamente tutte le garanzie, ' +
                  'le rappresentazioni e le condizioni, esplicita o implicita, comprese quelle di qualità, ' +
                  'commerciabilità, qualità mercantile, durata, idoneità per uno scopo particolare, e quelli ' +
                  'derivanti dalla legge. Noi non siamo responsabili per qualsiasi perdita, sia di denaro ' +
                  '(compresi senza scopo di lucro), l\'avviamento o di reputazione, o di danni speciali, ' +
                  'diretti o indiretti derivanti dall\'uso di Neobazaar, anche nel caso in cui si potesse ' +
                  'ragionevolmente prevedere la possibilità di tale danno.</p>' +

                  '<h3>Dati Personali</h3>' +
                  '<p>Utilizzando Neobazaar, l\'utente accetta la raccolta, il trasferimento, ' +
                  'stoccaggio e utilizzo dei tuoi dati personali da parte di Neobazaar. L\'utente accetta ' +
                  'inoltre di ricevere comunicazioni di marketing da noi a meno che non ci sia comunicato ' +
                  'che non si desidera ricevere tali comunicazioni.</p>'
            };
            break;
          }
        });