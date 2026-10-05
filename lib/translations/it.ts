import type { Translation } from "./types";
export const it: Translation = {
  nav: { home: "Home", play: "Gioca", rules: "Come si gioca", modes: "Modalità", drinking: "Giochi da bere", party: "Per le feste", faq: "Domande" },
  homeLabel: "Torna alla home", guideLabel: "GUIDA AL GIOCO", footer: "Gioco di carte online gratuito per una persona, coppie o gruppi.", legalLabel: "Note legali e privacy (in spagnolo)",
  pages: {
    home: { title: "El Peaje: gioco di carte online gratis per feste", description: "Gioca a El Peaje online gratis: indovina le carte, supera i pedaggi e scegli tra sei modalità da 1 a 8 giocatori. Senza download né registrazione.", kicker: "52 carte · da 1 a 8 giocatori", intro: "El Peaje è un gioco di carte online gratuito per amici, coppie o una partita in solitaria. Indovina la carta successiva per avanzare. Se sbagli torni indietro; quando attraversi un pedaggio affronti una prova scelta dal gruppo.", cta: "Gioca gratis", sections: [
      { heading: "Come funziona El Peaje?", body: "Il sito mescola un mazzo di 52 carte. Parti da una carta scoperta, indovina se la prossima sarà più alta o più bassa e rispondi alle domande su seme e colore. Ogni risposta corretta ti fa avanzare.", link: "rules", linkLabel: "Leggi le regole" },
      { heading: "Un gioco di carte per la festa", body: "Gioca da solo, in coppia a turni oppure condividi un telefono in 3–8 persone nella modalità Patata bollente. Scegli un percorso breve o una sfida più difficile.", link: "modes", linkLabel: "Confronta le modalità" },
      { heading: "Cerchi giochi da bere gratis online?", body: "El Peaje si può adattare a una serata tra adulti, ma bere è facoltativo. Il gruppo decide il significato del pedaggio: punti, domande, una prova breve o una bevuta volontaria.", link: "drinking", linkLabel: "Guida ai giochi da bere" },
    ] },
    play: { title: "Gioca a El Peaje online gratis", description: "Avvia una partita gratuita a El Peaje nel browser. Scegli modalità e difficoltà e gioca da solo, in coppia o fino a otto persone.", kicker: "Senza download · Senza registrazione", intro: "Scegli giocatori, modalità e difficoltà qui sotto. Le carte vengono mescolate online: puoi iniziare subito.", cta: "Inizia una partita", sections: [
      { heading: "Vuoi conoscere le regole?", body: "Scopri come funzionano le previsioni delle carte e i pedaggi prima di iniziare.", link: "rules", linkLabel: "Come si gioca" },
      { heading: "Giochi con amici?", body: "Patata bollente è pensata per 3–8 persone con un telefono. Alcune carte indovinate permettono di passarlo.", link: "modes", linkLabel: "Scopri le modalità" },
    ] },
    rules: { title: "Come si gioca a El Peaje: regole del gioco", description: "Impara le regole di El Peaje: indovina le carte, avanza nel percorso, affronta i pedaggi e scopri come termina una partita.", kicker: "Regole in un minuto", intro: "L'obiettivo è completare un percorso di previsioni con un mazzo di 52 carte. Le risposte corrette ti fanno avanzare; gli errori ti fanno tornare indietro, a volte attraversando un pedaggio.", cta: "Gioca a El Peaje", sections: [
      { heading: "Le regole fondamentali", items: [
        { title: "1. Parti da una carta scoperta", body: "È la carta di riferimento. Il mazzo viene mescolato all'inizio e nessuna carta si ripete nella stessa partita." },
        { title: "2. Indovina la carta successiva", body: "Per prima cosa scegli più alta o più bassa. L'asso è la carta più alta e un valore uguale è un errore. Poi rispondi su forma del seme, colore e seme esatto." },
        { title: "3. Avanza nel percorso", body: "Una risposta corretta ti fa avanzare. Un errore aggiunge un fallo e ti fa retrocedere di una posizione. Un pedaggio attraversato in entrambi i sensi va completato." },
        { title: "4. Completa il percorso", body: "Vinci superando l'ultima domanda. La partita termina anche quando finisce il mazzo o, nella modalità cooperativa, dopo sei errori." },
        {"title": "Un turno concreto", "body": "Con 6♥ come riferimento iniziale, maggiore riesce con 10♣ ma fallisce con 6♦: un valore uguale perde qualunque sia il seme. Un errore alla prima domanda conserva il riferimento iniziale. Il pedaggio non consuma carte; ogni risposta rivelata toglie una carta dal mazzo."},
    ] },
      { heading: "Che cos'è un pedaggio?", body: "È una tappa tra le domande sulle carte. Prima di giocare concordate una conseguenza breve e sicura: un punto, una domanda o una prova. L'alcol non è necessario.", link: "drinking", linkLabel: "Pedaggi e alternative analcoliche" },
    ] },
    modes: { title: "Modalità e difficoltà di El Peaje", description: "Confronta sei modalità di El Peaje, inclusa Patata bollente per 3–8 giocatori, e scegli la difficoltà più adatta.", kicker: "Scegli il percorso", intro: "El Peaje offre sei modalità e percorsi di lunghezza diversa. Le previsioni restano le stesse; cambiano punteggio, turni o obiettivo.", cta: "Scegli e gioca", sections: [
      { heading: "Sei modi di giocare", items: [
        { title: "Classico", body: "Arriva all'ultima domanda. Avanzi se indovini e torni indietro se sbagli. Non aggiunge un obiettivo di punteggio né un limite agli errori. Serve per imparare da soli o con una seconda persona che rivela la carta e valuta una risposta detta ad alta voce." },
        { title: "A punti", body: "Ogni errore vale un punto e ogni pedaggio due. Cerca di finire con il punteggio più basso. Tre errori e due passaggi al pedaggio valgono sette punti. Contano anche i passaggi all'indietro; confrontate percorsi completati alla stessa difficoltà, perché ogni partita mescola un nuovo mazzo." },
        { title: "Cooperativo", body: "La squadra condivide un percorso e prova a finirlo prima del sesto errore. Il sesto errore termina subito il tentativo. Una persona può usare il telefono mentre la squadra discute le risposte: il gioco conserva un solo percorso, non profili individuali." },
        { title: "Turni rapidi", body: "Due giocatori hanno mazzi e percorsi separati. Un errore passa il turno all'altro. Ogni percorso ha un mazzo mescolato separatamente. Una risposta corretta mantiene il turno; quando tocca di nuovo a te, riprendi l'errore o il pedaggio in sospeso prima di rispondere." },
        { title: "Pedaggio sicuro", body: "Sostituisce i pedaggi con prove o domande concordate, senza bevande. Le regole delle carte e gli arretramenti restano uguali. Preparate una domanda o una prova breve: il gioco cambia i messaggi del pedaggio ma non genera attività automaticamente." },
        { title: "Patata bollente", body: "Da 3 a 8 persone con un telefono. Alcune carte indovinate permettono di passarlo; se sbagli lo tieni. All'inizio vengono selezionate 20 delle 51 carte nascoste come carte di passaggio. Se ne indovini una e la partita può continuare, puoi passare il telefono o tenerlo. Conferma prima eventuali pedaggi. Non c'è un timer." },
      ] },
      { heading: "Facile, media e difficile", body: "Facile: tre domande e un pedaggio. Media: quattro domande e un pedaggio. Difficile: quattro domande e due pedaggi. Patata bollente ha Normale e Difficile; quest'ultima aggiunge pari o dispari.", link: "play", linkLabel: "Inizia a giocare" },
    ] },
    drinking: { title: "Giochi da bere gratis online: El Peaje", description: "Cerchi giochi da bere gratis? Gioca a El Peaje online con carte e pedaggi scelti dal gruppo. Scopri le regole e gioca anche senza alcol.", kicker: "Carte per la prossima serata", intro: "El Peaje è un gioco di carte online gratuito adatto a una festa. Gli adulti possono scegliere una variante con bevande, ma il gioco non obbliga a bere né stabilisce quantità. Punti, domande e prove funzionano altrettanto bene.", cta: "Gioca gratis", sections: [
      { heading: "Come preparare una partita di gruppo", items: [
        { title: "1. Scegliete i giocatori", body: "Basta un telefono. Patata bollente è per 3–8 persone; sono disponibili anche partite singole o in coppia." },
        { title: "2. Concordate il pedaggio", body: "Decidete prima di iniziare cosa succede a un pedaggio. Qualsiasi bevanda deve essere volontaria e tutti possono rinunciare senza spiegazioni." },
        { title: "3. Indovinate le carte", body: "Il sito mescola 52 carte. Indovinare fa avanzare, sbagliare fa retrocedere. Superate l'ultima domanda per finire." },
        {"title": "Separare punteggio e pedaggio", "body": "Il modo Punti conta un punto per errore e due per passaggio al pedaggio, anche tornando indietro. È un punteggio digitale, mai una quantità da bere. Usate un consiglio musicale, una domanda semplice o una marca sul foglio. Chiunque può saltare la prova e confermare il pedaggio per proseguire."},
    ] },
      { heading: "El Peaje è un gioco da bere gratuito?", body: "Sì, giocare è gratis, senza registrazione o app. Potete adattare i pedaggi a una serata tra adulti o giocare completamente senza alcol.", link: "rules", linkLabel: "Leggi tutte le regole" },
      { heading: "Si può giocare senza alcol?", body: "Certo. Usate punti, acqua, domande o prove brevi. La modalità Pedaggio sicuro è pensata per giocare senza bevande.", link: "play", linkLabel: "Avvia il gioco" },
    ] },
    party: { title: "El Peaje: gioco di carte online per feste", description: "Prepara El Peaje per una festa: regole rapide, modalità per gruppi e pedaggi flessibili. Gioca online gratis con un telefono.", kicker: "Prima di uscire", intro: "Bastano un telefono e alcuni amici. El Peaje mescola le carte e guida la partita; voi scegliete la modalità e il significato dei pedaggi.", cta: "Inizia la partita", sections: [
      { heading: "Preparazione veloce", items: [
        { title: "Scegliete il gruppo", body: "Giocate in coppia o selezionate Patata bollente per 3–8 persone." },
        { title: "Decidete il pedaggio", body: "Scegliete punti, domande o prove brevi. Le bevande sono facoltative e solo tra adulti." },
        { title: "Fate la prima previsione", body: "Indovinate se la prossima carta sarà più alta o più bassa e continuate lungo il percorso." },
        {"title": "Uno schermo per il gruppo", "body": "Il QR apre il sito ma non collega i dispositivi. Assegnate i numeri prima di iniziare Patata bollente e concordate quando finire la sessione. Se cambia il gruppo, iniziate una nuova partita con il nuovo numero di persone. Oltre otto, formate tavoli separati o squadre con un operatore ciascuna."},
    ] },
      { heading: "Quale modalità scegliere?", body: "Classico e Facile sono perfetti per iniziare. A punti aggiunge un punteggio. Patata bollente permette passaggi a sorpresa dopo alcune risposte corrette.", link: "modes", linkLabel: "Confronta le sei modalità" },
    ] },
    faq: { title: "Domande frequenti su El Peaje", description: "Risposte su carte, gioco online gratis, giocatori, pedaggi, alternative senza alcol e fine della partita.", kicker: "Risposte rapide", intro: "Le domande più comuni prima di giocare a El Peaje online.", cta: "Gioca ora", sections: [
      { heading: "Domande frequenti", items: [
        { title: "El Peaje è gratis online?", body: "Sì. Apri il gioco nel browser: non servono account, download o carte fisiche." },
        { title: "Quante persone possono giocare?", body: "Da soli, in coppia o in 3–8 persone con un telefono nella modalità Patata bollente." },
        { title: "Bisogna bere?", body: "No. Il gruppo decide il pedaggio. Punti, domande, acqua e prove brevi funzionano senza alcol." },
        { title: "Quanto vale l'asso?", body: "L'asso è la carta più alta. Nella previsione più alta o più bassa, un valore uguale è un errore." },
        { title: "Le carte si ripetono?", body: "No. Il sito usa un mazzo mescolato di 52 carte senza ripetizioni nella stessa partita." },
        { title: "Quando finisce la partita?", body: "Quando superi l'ultima domanda, finisce il mazzo oppure la squadra raggiunge sei errori in Cooperativo." },
      ], link: "rules", linkLabel: "Leggi le regole complete" },
      {"heading": "Funziona su telefono e computer?", "body": "Usa un browser attuale su entrambi. Le partite restano nella memoria del browser e si perdono ricaricando o chiudendo la scheda. Telefoni diversi creano partite diverse; condividere il link non trasferisce carte o progressi. Non esiste una modalità offline installata."},
    ] },
  },
};
