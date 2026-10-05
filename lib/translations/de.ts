import type { Translation } from "./types";
export const de: Translation = {
  nav: { home: "Startseite", play: "Spielen", rules: "Spielregeln", modes: "Spielmodi", drinking: "Trinkspiele", party: "Partyspiel", faq: "Fragen" },
  homeLabel: "Zur Startseite", guideLabel: "SPIELANLEITUNG", footer: "Kostenloses Online-Kartenspiel für eine Person, Paare und Gruppen.", legalLabel: "Rechtliches und Datenschutz (Spanisch)",
  pages: {
    home: { title: "El Peaje: kostenloses Online-Kartenspiel für Partys", description: "Spiele El Peaje kostenlos online. Sage Karten voraus, passiere Mautstellen und wähle aus sechs Modi für 1 bis 8 Personen. Ohne Download und Anmeldung.", kicker: "52 Karten · 1 bis 8 Personen", intro: "El Peaje ist ein kostenloses Online-Kartenspiel für Freunde, Paare und Einzelspieler. Sage die nächste Karte voraus und rücke vor. Bei einem Fehler gehst du zurück; an einer Mautstelle erfüllt ihr eine vorher vereinbarte Aufgabe.", cta: "Jetzt kostenlos spielen", sections: [
      { heading: "Wie funktioniert El Peaje?", body: "Die Website mischt ein Deck mit 52 Karten. Eine offene Karte ist der Ausgangspunkt: Rate, ob die nächste höher oder niedriger ist, und beantworte danach Fragen zu Form, Farbe und Kartenfarbe. Richtige Antworten bringen dich voran.", link: "rules", linkLabel: "Spielregeln lesen" },
      { heading: "Kartenspiel für eure nächste Party", body: "Spiele allein, zu zweit abwechselnd oder teile ein Handy mit 3 bis 8 Personen im Modus Heiße Kartoffel. Wähle eine kurze oder anspruchsvollere Strecke.", link: "modes", linkLabel: "Spielmodi vergleichen" },
      { heading: "Kostenlose Trinkspiele online gesucht?", body: "El Peaje lässt sich für eine Erwachsenenrunde anpassen, aber Getränke sind freiwillig. Eure Gruppe bestimmt die Maut: Punkte, Fragen, eine kurze Aufgabe oder ein freiwilliges Getränk.", link: "drinking", linkLabel: "Zum Trinkspiel-Ratgeber" },
    ] },
    play: { title: "El Peaje kostenlos online spielen", description: "Starte El Peaje kostenlos im Browser. Wähle Modus und Schwierigkeitsgrad und spiele allein, zu zweit oder mit bis zu acht Personen.", kicker: "Ohne Download · Ohne Anmeldung", intro: "Wähle unten Anzahl der Personen, Modus und Schwierigkeitsgrad. Die Karten werden online gemischt und du kannst sofort beginnen.", cta: "Spiel starten", sections: [
      { heading: "Regeln noch unklar?", body: "Lies nach, wie Kartenvorhersagen und Mautstellen funktionieren.", link: "rules", linkLabel: "So funktioniert es" },
      { heading: "Mit Freunden spielen?", body: "Heiße Kartoffel ist für 3 bis 8 Personen an einem Handy gedacht. Bei bestimmten richtigen Karten darfst du es weitergeben.", link: "modes", linkLabel: "Spielmodi entdecken" },
    ] },
    rules: { title: "El Peaje Spielregeln: So geht das Kartenspiel", description: "Lerne die Regeln von El Peaje: Karten vorhersagen, auf der Strecke vorrücken, Mautstellen meistern und eine Partie abschließen.", kicker: "Regeln in einer Minute", intro: "Ziel ist es, eine Strecke aus Kartenvorhersagen mit einem Deck aus 52 Karten zu meistern. Richtige Antworten bringen dich voran; Fehler werfen dich zurück, manchmal über eine Mautstelle.", cta: "El Peaje spielen", sections: [
      { heading: "Die Grundregeln", items: [
        { title: "1. Mit einer offenen Karte beginnen", body: "Sie ist deine Referenzkarte. Das Deck wird zu Beginn gemischt; innerhalb einer Partie wird keine Karte wiederholt." },
        { title: "2. Die nächste Karte vorhersagen", body: "Rate zuerst höher oder niedriger. Das Ass ist die höchste Karte und ein gleicher Wert zählt als Fehler. Später folgen Fragen zu Form, Farbe und genauer Kartenfarbe." },
        { title: "3. Auf der Strecke ziehen", body: "Eine richtige Antwort bringt dich voran. Ein Fehler zählt als Fehlversuch und wirft dich einen Schritt zurück. Eine Mautstelle gilt in beide Richtungen." },
        { title: "4. Die Strecke abschließen", body: "Du gewinnst nach der letzten Frage. Die Partie endet auch bei leerem Deck oder im Kooperationsmodus nach sechs Fehlern." },
        {"title": "Ein konkreter Zug", "body": "Mit 6♥ als Anfangsreferenz ist höher bei 10♣ richtig, bei 6♦ aber falsch: Gleiche Werte verlieren unabhängig von der Farbe. Ein Fehler bei der ersten Frage behält die Anfangsreferenz. Die Maut verbraucht keine Karte; jede aufgedeckte Antwort entfernt eine Karte aus dem Deck."},
    ] },
      { heading: "Was ist eine Mautstelle?", body: "Ein Halt zwischen Kartenfragen. Vereinbart vorher eine kurze, sichere Aufgabe: einen Punkt, eine Frage oder eine kleine Herausforderung. Alkohol ist nicht erforderlich.", link: "drinking", linkLabel: "Mautstellen ohne Alkohol" },
    ] },
    modes: { title: "El Peaje: Spielmodi und Schwierigkeitsgrade", description: "Vergleiche sechs El-Peaje-Modi, darunter Heiße Kartoffel für 3 bis 8 Personen, und wähle deine Strecke.", kicker: "Wähle deine Strecke", intro: "El Peaje bietet sechs Modi und verschiedene Streckenlängen. Die Kartenvorhersagen bleiben gleich; Wertung, Zugfolge oder Ziel ändern sich.", cta: "Modus wählen und spielen", sections: [
      { heading: "Sechs Spielarten", items: [
        { title: "Klassisch", body: "Erreiche die letzte Frage. Richtige Antworten bringen dich voran, Fehler zurück. Dieser Modus ergänzt weder ein Punkteziel noch eine Fehlergrenze. Lerne die Strecke allein kennen oder lass eine zweite Person die Karte aufdecken und eine mündliche Antwort bewerten." },
        { title: "Punkte", body: "Jeder Fehler zählt einen Punkt, jede Mautstelle zwei. Ziele auf die niedrigste Punktzahl. Drei Fehler und zwei Mautquerungen ergeben sieben Punkte. Auch rückwärts überquerte Mautstellen zählen; vergleicht abgeschlossene Strecken derselben Schwierigkeit, denn jedes Spiel mischt ein neues Deck." },
        { title: "Kooperativ", body: "Das Team teilt eine Strecke und muss sie vor dem sechsten Fehler schaffen. Der sechste Fehler beendet den Versuch sofort. Eine Person bedient das Telefon, während das Team die Antworten bespricht. Das Spiel führt eine gemeinsame Strecke und keine einzelnen Teamprofile." },
        { title: "Schnelle Züge", body: "Zwei Personen haben jeweils ein eigenes Deck und eine eigene Strecke. Ein Fehler gibt den Zug ab. Jede Strecke hat ein separat gemischtes Deck. Eine richtige Antwort behält den Zug; wenn du wieder dran bist, setzt du deinen ausstehenden Fehler oder die Maut fort, bevor du erneut antwortest." },
        { title: "Sichere Maut", body: "Ersetzt Mautaufgaben durch vereinbarte Fragen oder kleine Herausforderungen ohne Getränke. Kartenregeln und Rückschritte bleiben gleich. Bereitet selbst eine kurze Frage oder Aufgabe vor: Das Spiel ändert die Mauttexte, erzeugt aber keine Aufgaben automatisch." },
        { title: "Heiße Kartoffel", body: "Für 3 bis 8 Personen an einem Handy. Einige richtig erratene Karten erlauben die Weitergabe; bei Fehlern behältst du es. Zu Beginn werden 20 der 51 verdeckten Karten als Weitergabekarten ausgewählt. Ein richtiger Tipp auf eine davon kann die Weitergabe erlauben, wenn das Spiel weitergeht. Bestätige zuerst die Maut und wähle dann eine Person oder behalte das Telefon. Es gibt keinen Timer." },
      ] },
      { heading: "Leicht, mittel und schwer", body: "Leicht: drei Fragen und eine Mautstelle. Mittel: vier Fragen und eine Mautstelle. Schwer: vier Fragen und zwei Mautstellen. Heiße Kartoffel bietet Normal und Schwer; Schwer ergänzt gerade oder ungerade.", link: "play", linkLabel: "Jetzt spielen" },
    ] },
    drinking: { title: "Kostenlose Trinkspiele online: El Peaje", description: "Kostenlose Trinkspiele gesucht? Spiele El Peaje online mit Karten und selbst bestimmten Mautstellen. Regeln für Runden mit oder ohne Alkohol.", kicker: "Karten für eure Runde", intro: "El Peaje ist ein kostenloses Online-Kartenspiel für gesellige Runden. Erwachsene können freiwillig Getränke als Maut vereinbaren; das Spiel verlangt keinen Alkohol und legt keine Mengen fest. Punkte oder kleine Aufgaben funktionieren ebenso.", cta: "Kostenlos spielen", sections: [
      { heading: "So startet ihr eine Gruppenpartie", items: [
        { title: "1. Personen wählen", body: "Ein Handy genügt. Heiße Kartoffel unterstützt 3 bis 8 Personen; allein oder zu zweit geht es ebenfalls." },
        { title: "2. Maut vereinbaren", body: "Legt vorher fest, was an einer Mautstelle passiert. Getränke bleiben freiwillig; jede Person kann ohne Erklärung aussetzen." },
        { title: "3. Karten vorhersagen", body: "Die Website mischt 52 Karten. Richtige Antworten bringen euch voran, Fehler zurück. Schafft die letzte Frage." },
        {"title": "Punkte und Maut getrennt halten", "body": "Der Punktemodus zählt einen Punkt pro Fehler und zwei pro Mautquerung, auch rückwärts. Das ist ein digitaler Punktestand und keine Trinkmenge. Nutzt stattdessen eine Musikempfehlung, eine einfache Frage oder einen Strich auf Papier. Jede Person kann die Aufgabe auslassen und die Maut bestätigen."},
    ] },
      { heading: "Ist El Peaje ein kostenloses Trinkspiel?", body: "Das Spielen ist kostenlos, ohne Konto oder App. Ihr könnt die Maut für eine Erwachsenenrunde anpassen oder ganz ohne Alkohol spielen.", link: "rules", linkLabel: "Alle Regeln ansehen" },
      { heading: "Geht es auch ohne Alkohol?", body: "Ja. Nutzt Punkte, Wasser, Fragen oder kurze Aufgaben. Der Modus Sichere Maut ist für Aufgaben ohne Getränke gedacht.", link: "play", linkLabel: "Spiel starten" },
    ] },
    party: { title: "El Peaje: kostenloses Online-Party-Kartenspiel", description: "Bereite El Peaje für eine Party vor: schnelle Regeln, Gruppenmodi und flexible Mautstellen. Kostenlos online mit einem Handy spielen.", kicker: "Vor der Party", intro: "Ein Handy und ein paar Freunde reichen. El Peaje mischt die Karten und führt durch die Partie; ihr wählt den Modus und legt die Maut fest.", cta: "Partyspiel starten", sections: [
      { heading: "Schnell vorbereitet", items: [
        { title: "Gruppe wählen", body: "Spielt zu zweit oder wählt Heiße Kartoffel für 3 bis 8 Personen." },
        { title: "Maut festlegen", body: "Einigt euch auf Punkte, Fragen oder kurze Aufgaben. Getränke sind nur für Erwachsene und immer freiwillig." },
        { title: "Erste Karte vorhersagen", body: "Rate höher oder niedriger und arbeite dich über die Strecke vor." },
        {"title": "Ein Bildschirm für die Gruppe", "body": "Der QR-Code öffnet die Webseite, verbindet aber keine Geräte. Verteilt vor Hot Potato die Spielernummern und vereinbart das Ende der Sitzung. Bei einer anderen Gruppengröße beginnt ihr ein neues Spiel. Über acht Personen bildet ihr getrennte Tische oder Teams mit je einer Bedienperson."},
    ] },
      { heading: "Welcher Modus passt?", body: "Klassisch und Leicht sind ein kurzer Einstieg. Punkte bietet eine Wertung. Heiße Kartoffel bringt überraschende Handywechsel nach manchen Treffern.", link: "modes", linkLabel: "Alle sechs Modi vergleichen" },
    ] },
    faq: { title: "El Peaje FAQ: Regeln, Personen und Mautstellen", description: "Antworten zu Karten, kostenlosem Online-Spiel, Gruppengröße, Mautstellen und Spielen ohne Alkohol.", kicker: "Kurze Antworten", intro: "Die häufigsten Fragen, bevor du El Peaje online spielst.", cta: "Jetzt spielen", sections: [
      { heading: "Häufige Fragen", items: [
        { title: "Ist El Peaje kostenlos online spielbar?", body: "Ja. Öffne es im Browser; Konto, Download und physische Karten sind nicht nötig." },
        { title: "Wie viele Personen können spielen?", body: "Allein, zu zweit oder mit 3 bis 8 Personen an einem Handy im Modus Heiße Kartoffel." },
        { title: "Muss man trinken?", body: "Nein. Die Gruppe bestimmt die Maut. Punkte, Fragen, Wasser und kurze Aufgaben funktionieren ohne Alkohol." },
        { title: "Welchen Wert hat das Ass?", body: "Das Ass ist die höchste Karte. Bei höher oder niedriger zählt ein gleicher Wert als Fehler." },
        { title: "Werden Karten wiederholt?", body: "Nein. Das gemischte Deck enthält 52 Karten ohne Wiederholung in derselben Partie." },
        { title: "Wann endet die Partie?", body: "Nach der letzten Frage, bei leerem Deck oder im Kooperationsmodus nach sechs Fehlern." },
      ], link: "rules", linkLabel: "Alle Regeln lesen" },
      {"heading": "Funktioniert es auf Handy und Computer?", "body": "Nutze einen aktuellen Browser auf beiden Geräten. Spiele bleiben im Browserspeicher und gehen beim Neuladen oder Schließen verloren. Verschiedene Handys erzeugen getrennte Spiele; ein Link überträgt keine Karten oder Fortschritte. Es gibt keinen installierten Offline-Modus."},
    ] },
  },
};
