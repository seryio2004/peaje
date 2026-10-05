import type { Translation } from "./types";
export const fr: Translation = {
  nav: { home: "Accueil", play: "Jouer", rules: "Règles", modes: "Modes de jeu", drinking: "Jeux à boire", party: "Pour la soirée", faq: "Questions" },
  homeLabel: "Retour à l'accueil", guideLabel: "GUIDE DU JEU", footer: "Jeu de cartes gratuit en ligne, seul, à deux ou en groupe.", legalLabel: "Mentions légales et confidentialité (en espagnol)",
  pages: {
    home: { title: "El Peaje : jeu de cartes gratuit en ligne pour soirées", description: "Jouez gratuitement à El Peaje en ligne. Devinez les cartes, franchissez les péages et choisissez parmi six modes pour 1 à 8 personnes. Sans inscription.", kicker: "52 cartes · 1 à 8 joueurs", intro: "El Peaje est un jeu de cartes gratuit en ligne pour jouer seul, à deux ou entre amis. Devinez la prochaine carte pour avancer. Une erreur vous fait reculer ; au péage, relevez un défi choisi ensemble.", cta: "Jouer gratuitement", sections: [
      { heading: "Comment fonctionne El Peaje ?", body: "Le site mélange un jeu de 52 cartes. Une carte visible sert de référence : devinez si la suivante sera plus haute ou plus basse, puis répondez aux questions sur sa couleur et son enseigne. Chaque bonne réponse vous fait avancer.", link: "rules", linkLabel: "Lire les règles" },
      { heading: "Un jeu de cartes pour votre soirée", body: "Jouez seul, à deux chacun votre tour ou partagez un téléphone à 3–8 en mode Patate chaude. Choisissez un parcours court ou plus difficile.", link: "modes", linkLabel: "Comparer les modes" },
      { heading: "Vous cherchez des jeux à boire gratuits ?", body: "El Peaje s'adapte à une soirée entre adultes, mais boire reste facultatif. Le groupe décide du péage : points, questions, petit défi ou boisson volontaire.", link: "drinking", linkLabel: "Voir le guide des jeux à boire" },
    ] },
    play: { title: "Jouer à El Peaje gratuitement en ligne", description: "Lancez une partie gratuite d'El Peaje dans votre navigateur. Choisissez un mode et jouez seul, à deux ou jusqu'à huit personnes.", kicker: "Sans téléchargement · Sans inscription", intro: "Choisissez le nombre de joueurs, le mode et la difficulté ci-dessous. Les cartes sont mélangées en ligne : commencez immédiatement.", cta: "Lancer une partie", sections: [
      { heading: "Besoin des règles ?", body: "Découvrez les prédictions de cartes et le fonctionnement des péages avant de jouer.", link: "rules", linkLabel: "Comment jouer" },
      { heading: "Vous jouez entre amis ?", body: "Patate chaude est conçu pour 3 à 8 personnes autour d'un téléphone. Certaines bonnes réponses permettent de le passer.", link: "modes", linkLabel: "Découvrir les modes" },
    ] },
    rules: { title: "Règles d'El Peaje : comment jouer", description: "Apprenez les règles d'El Peaje : prédisez les cartes, avancez sur le parcours, franchissez les péages et terminez la partie.", kicker: "Les règles en une minute", intro: "Le but est de terminer un parcours de prédictions avec un jeu de 52 cartes. Les bonnes réponses vous font avancer ; les erreurs vous font reculer, parfois à travers un péage.", cta: "Jouer à El Peaje", sections: [
      { heading: "Les règles essentielles", items: [
        { title: "1. Commencez avec une carte visible", body: "C'est votre carte de référence. Le paquet est mélangé au début et aucune carte ne revient pendant la partie." },
        { title: "2. Prédisez la prochaine carte", body: "D'abord, choisissez plus haute ou plus basse. L'as est le plus fort et une égalité compte comme erreur. Ensuite, répondez sur la forme, la couleur et l'enseigne exacte." },
        { title: "3. Avancez sur le parcours", body: "Une bonne réponse vous fait avancer. Une erreur ajoute un échec et vous fait reculer d'une case. Tout péage traversé doit être accompli, dans les deux sens." },
        { title: "4. Terminez le parcours", body: "Gagnez en réussissant la dernière question. La partie s'arrête aussi si le paquet est vide ou, en mode coopératif, après six erreurs." },
        {"title": "Un tour concret", "body": "Avec 6♥ comme référence initiale, plus haut réussit sur 10♣ mais échoue sur 6♦ : une valeur égale perd quelle que soit la couleur. Une erreur à la première question conserve la référence initiale. Un péage ne consomme aucune carte ; chaque réponse révélée retire une carte du paquet."},
    ] },
      { heading: "Qu'est-ce qu'un péage ?", body: "Un arrêt entre deux questions. Convenez avant de jouer d'une conséquence courte et sûre : un point, une question ou un petit défi. L'alcool n'est jamais obligatoire.", link: "drinking", linkLabel: "Péages sans alcool" },
    ] },
    modes: { title: "Modes de jeu et difficulté d'El Peaje", description: "Comparez les six modes d'El Peaje, dont Patate chaude pour 3 à 8 joueurs, et choisissez votre difficulté.", kicker: "Choisissez votre parcours", intro: "El Peaje propose six modes et plusieurs longueurs de parcours. Les prédictions restent les mêmes ; le score, les tours ou l'objectif changent.", cta: "Choisir un mode", sections: [
      { heading: "Six façons de jouer", items: [
        { title: "Classique", body: "Atteignez la dernière question. Une réussite vous fait avancer, une erreur vous fait reculer. Ce mode n'ajoute ni objectif de score ni limite d'erreurs. Il permet d'apprendre seul ou avec une personne qui révèle la carte et valide une réponse donnée à voix haute." },
        { title: "Points", body: "Chaque erreur ajoute un point et chaque péage deux. Terminez avec le score le plus bas. Trois erreurs et deux passages au péage donnent sept points. Les passages en arrière comptent aussi ; comparez des parcours terminés de même difficulté, car chaque partie mélange un nouveau paquet." },
        { title: "Coopératif", body: "L'équipe partage un parcours et doit le finir avant la sixième erreur. La sixième erreur termine immédiatement la tentative. Une personne peut utiliser le téléphone pendant que l'équipe discute : le jeu garde un seul parcours partagé, sans profils individuels." },
        { title: "Tours rapides", body: "Deux joueurs ont chacun un paquet et un parcours. Une erreur passe le tour à l'autre. Chaque parcours dispose de son propre paquet mélangé. Une bonne réponse conserve le tour ; lorsque ton tour revient, reprends l'erreur ou le péage en attente avant de répondre à nouveau." },
        { title: "Péage sûr", body: "Remplace les consignes de péage par des questions ou de petits défis sans boisson. Les règles des cartes et les retours en arrière restent identiques. Préparez une question ou un défi court : le jeu change les messages du péage, mais ne génère pas de tâches automatiquement." },
        { title: "Patate chaude", body: "De 3 à 8 personnes avec un téléphone. Certaines cartes réussies permettent de le passer ; une erreur vous oblige à le garder. Au départ, 20 des 51 cartes cachées sont choisies comme cartes de passage. En devinant l'une d'elles, tu peux passer le téléphone si la partie peut continuer. Confirme d'abord tout péage, puis choisis une personne ou garde le téléphone. Il n'y a pas de minuteur." },
      ] },
      { heading: "Facile, moyen et difficile", body: "Facile : trois questions et un péage. Moyen : quatre questions et un péage. Difficile : quatre questions et deux péages. Patate chaude propose Normal et Difficile ; ce dernier ajoute pair ou impair.", link: "play", linkLabel: "Commencer à jouer" },
    ] },
    drinking: { title: "Jeux à boire gratuits en ligne : El Peaje", description: "Vous cherchez des jeux à boire gratuits ? Jouez à El Peaje en ligne avec des cartes et des péages définis par le groupe, avec ou sans alcool.", kicker: "Des cartes pour votre soirée", intro: "El Peaje est un jeu de cartes gratuit en ligne adapté aux soirées. Entre adultes, vous pouvez choisir une variante avec boissons, mais le jeu n'impose ni alcool ni quantité. Points, questions et défis courts marchent aussi bien.", cta: "Jouer gratuitement", sections: [
      { heading: "Préparer une partie en groupe", items: [
        { title: "1. Choisissez les joueurs", body: "Un téléphone suffit. Patate chaude convient à 3–8 personnes ; vous pouvez aussi jouer seul ou à deux." },
        { title: "2. Définissez le péage", body: "Avant la première carte, décidez ce qui se passe au péage. Une boisson reste facultative et chacun peut refuser sans se justifier." },
        { title: "3. Prédisez les cartes", body: "Le site mélange 52 cartes. Une bonne réponse fait avancer, une erreur fait reculer. Réussissez la dernière question pour finir." },
        {"title": "Séparer le score et le péage", "body": "Le mode Points compte un point par erreur et deux par passage au péage, même en arrière. Ce score numérique ne représente jamais une quantité à boire. Choisissez une recommandation musicale, une question simple ou une marque sur papier. Chacun peut passer le défi et confirmer le péage pour continuer."},
    ] },
      { heading: "El Peaje est-il un jeu à boire gratuit ?", body: "Oui, le jeu est gratuit, sans compte ni application. Adaptez les péages à une soirée entre adultes ou jouez entièrement sans alcool.", link: "rules", linkLabel: "Voir toutes les règles" },
      { heading: "Peut-on jouer sans alcool ?", body: "Oui. Utilisez des points, de l'eau, des questions ou de courts défis. Le mode Péage sûr est conçu pour les défis sans boisson.", link: "play", linkLabel: "Lancer le jeu" },
    ] },
    party: { title: "El Peaje : jeu de cartes gratuit pour soirées", description: "Préparez El Peaje pour votre soirée : règles rapides, modes de groupe et péages souples. Jouez gratuitement sur un téléphone.", kicker: "Avant de sortir", intro: "Un téléphone et quelques amis suffisent. El Peaje mélange les cartes et guide la partie ; vous choisissez le mode et le sens des péages.", cta: "Lancer la partie", sections: [
      { heading: "Une mise en place rapide", items: [
        { title: "Choisissez le groupe", body: "Jouez à deux ou choisissez Patate chaude pour 3 à 8 personnes." },
        { title: "Fixez le péage", body: "Prévoyez des points, des questions ou de petits défis. Les boissons sont facultatives et réservées aux adultes." },
        { title: "Faites votre première prédiction", body: "Devinez plus haute ou plus basse, puis progressez sur le parcours." },
        {"title": "Un écran pour le groupe", "body": "Le QR ouvre le site mais ne relie pas les appareils. Attribuez les numéros avant de lancer Patate chaude et convenez de la fin de la session. Si le groupe change, lancez une nouvelle partie avec le nouveau nombre de joueurs. Au-delà de huit personnes, formez des tables séparées ou des équipes avec une personne aux commandes."},
    ] },
      { heading: "Quel mode choisir ?", body: "Classique et Facile offrent une partie courte. Points ajoute un score. Patate chaude permet des passages surprise du téléphone après certaines réussites.", link: "modes", linkLabel: "Comparer les six modes" },
    ] },
    faq: { title: "El Peaje : questions sur les règles et les péages", description: "Réponses sur les cartes, le jeu gratuit en ligne, le nombre de joueurs, les péages et les options sans alcool.", kicker: "Réponses rapides", intro: "Les questions les plus fréquentes avant de jouer à El Peaje en ligne.", cta: "Jouer maintenant", sections: [
      { heading: "Questions fréquentes", items: [
        { title: "El Peaje est-il gratuit en ligne ?", body: "Oui. Ouvrez le jeu dans votre navigateur : aucun compte, téléchargement ou paquet physique n'est nécessaire." },
        { title: "Combien de personnes peuvent jouer ?", body: "Seul, à deux ou à 3–8 personnes autour d'un téléphone en mode Patate chaude." },
        { title: "Faut-il boire ?", body: "Non. Le groupe définit le péage. Points, questions, eau et petits défis fonctionnent sans alcool." },
        { title: "Quelle est la valeur de l'as ?", body: "L'as est la carte la plus forte. Pour plus haute ou plus basse, une égalité est une erreur." },
        { title: "Les cartes reviennent-elles ?", body: "Non. Le jeu utilise 52 cartes mélangées sans répétition pendant la partie." },
        { title: "Quand la partie s'arrête-t-elle ?", body: "Après la dernière question, quand le paquet est épuisé ou après six erreurs en mode coopératif." },
      ], link: "rules", linkLabel: "Lire toutes les règles" },
      {"heading": "Le jeu fonctionne-t-il sur mobile et ordinateur ?", "body": "Utilisez un navigateur actuel sur les deux. La partie reste en mémoire et disparaît en rechargeant ou fermant l’onglet. Deux téléphones créent deux parties ; partager le lien ne transfère ni cartes ni progression. Il n’y a pas de mode hors ligne installé."},
    ] },
  },
};
