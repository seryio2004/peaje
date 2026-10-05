import type { Translation } from "./types";
export const en: Translation = {
  nav: { home: "Home", play: "Play", rules: "How to play", modes: "Game modes", drinking: "Drinking games", party: "Party game", faq: "FAQ" },
  homeLabel: "Back to home", guideLabel: "GAME GUIDE", footer: "A free online card game for one player, couples or groups.", legalLabel: "Legal and privacy information (Spanish)",
  pages: {
    home: { title: "El Peaje: free online card game for parties", description: "Play El Peaje online for free. Predict cards, cross tolls and choose from six modes for 1 to 8 players. No download or sign-up required.", kicker: "52 cards · 1 to 8 players", intro: "El Peaje is a free online card game for friends, couples and solo players. Guess the next card to move forward. A wrong guess sends you back; crossing a toll means completing a challenge chosen by your group.", cta: "Play free now", sections: [
      { heading: "How does El Peaje work?", body: "The site shuffles a standard 52-card deck. Start with a visible card, predict whether the next one is higher or lower, then answer questions about its suit and colour. Each correct answer moves you along the route.", link: "rules", linkLabel: "Read the rules" },
      { heading: "A card game for your next party", body: "Play alone, take turns as a pair or share one phone with 3 to 8 players in Hot Potato mode. Choose a short route for a quick game or a harder route for a longer challenge.", link: "modes", linkLabel: "Compare the modes" },
      { heading: "Looking for free online drinking games?", body: "El Peaje can be adapted for an adult gathering, but drinks are optional. The group decides what each toll means: points, questions, a short challenge or a voluntary drink. Everyone can opt out.", link: "drinking", linkLabel: "See the drinking game guide" },
    ] },
    play: { title: "Play El Peaje online for free", description: "Start a free El Peaje card game in your browser. Pick a mode and difficulty and play solo, as a pair or with up to eight people.", kicker: "No download · No sign-up", intro: "Choose your players, mode and difficulty below. The cards are shuffled online, so you can start immediately.", cta: "Start a game", sections: [
      { heading: "Need the rules?", body: "Read how the card predictions and tolls work before starting a game.", link: "rules", linkLabel: "How to play" },
      { heading: "Playing with friends?", body: "Hot Potato is designed for 3 to 8 people sharing one phone. A correct guess on certain cards lets you pass it on.", link: "modes", linkLabel: "Explore game modes" },
    ] },
    rules: { title: "How to play El Peaje: card game rules", description: "Learn the rules of El Peaje: predict cards, move along the route, complete tolls and find out how to win or finish a game.", kicker: "Rules in a minute", intro: "The goal is to complete a route of card predictions using a standard 52-card deck. Correct guesses move you forward. Wrong guesses send you back, sometimes across a toll.", cta: "Play El Peaje", sections: [
      { heading: "The basic rules", items: [
        { title: "1. Start with a visible card", body: "This is your reference card. The deck is shuffled at the start and no card is repeated during the game." },
        { title: "2. Predict the next card", body: "First guess higher or lower. An ace is high and an equal rank counts as a miss. Later questions ask about the suit shape, colour and exact suit." },
        { title: "3. Move along the route", body: "A correct answer moves you forward. A miss adds a failure and moves you back one position. A toll crossed in either direction must be completed." },
        { title: "4. Finish the route", body: "Win by clearing the final question. A game can also end when the deck runs out or, in cooperative mode, after six failures." },
        {"title": "A concrete turn", "body": "With 6♥ as the initial reference, higher succeeds on 10♣ but fails on 6♦: equal ranks lose regardless of suit. A miss on the first question keeps the initial reference. A toll consumes no card, while every revealed answer removes one from the deck."},
    ] },
      { heading: "What is a toll?", body: "A toll is a checkpoint between card questions. Agree on a short, safe consequence before playing: a point, a question or a brief challenge. Alcohol is never required.", link: "drinking", linkLabel: "Tolls and drink-free options" },
    ] },
    modes: { title: "El Peaje game modes and difficulty", description: "Compare six El Peaje game modes, including Hot Potato for 3 to 8 players, and choose a route that fits your group.", kicker: "Choose your route", intro: "El Peaje offers six modes and different route lengths. The card predictions stay the same; the scoring, turn order or goal changes.", cta: "Choose a mode and play", sections: [
      { heading: "Six ways to play", items: [
        { title: "Classic", body: "Reach the last question. Correct answers move you forward; wrong answers move you back. This mode adds no score objective or failure cap. Use it to learn the route alone, or have a second person reveal and judge a spoken prediction." },
        { title: "Points", body: "Each miss adds one point and each toll adds two. Finish with the lowest score. For example, three misses and two toll crossings give seven points. Backward crossings count too; compare completed routes at the same difficulty, since each new game shuffles a different deck." },
        { title: "Cooperative", body: "The team shares one route and tries to finish before the sixth failure. The sixth failure ends the attempt immediately. One person can operate the phone while the team discusses predictions; the game keeps one shared route, not individual team profiles." },
        { title: "Quick Turns", body: "Two players each have a separate deck and route. A miss passes the turn to the other player. Each route has its own shuffled deck. A correct answer keeps the turn; when your turn returns, resume your pending failure or toll before the next prediction." },
        { title: "Safe Toll", body: "Replace toll instructions with a short agreed challenge or question, without drinks. The card rules and backward movement stay the same. Prepare your own short question or challenge: the game changes the toll messages but does not generate tasks for you." },
        { title: "Hot Potato", body: "For 3 to 8 players sharing one phone. Some correct cards let you pass the phone to someone else; a miss means you keep it. At the start, 20 of the 51 hidden cards are selected as pass cards. A correct one can offer a pass if the game can continue; complete any toll first, then choose a recipient or keep the phone. There is no timer." },
      ] },
      { heading: "Easy, medium and hard", body: "Easy has three questions and one toll. Medium has four questions and one toll. Hard has four questions and two tolls. Hot Potato has Normal and Hard routes; Hard adds an even-or-odd question.", link: "play", linkLabel: "Start playing" },
    ] },
    drinking: { title: "Free online drinking games: play El Peaje", description: "Looking for free drinking games online? Play El Peaje with cards and group-defined tolls. Learn the rules and play with or without alcohol.", kicker: "Cards for your next gathering", intro: "El Peaje is a free online card game that can fit a party. Adults may agree to use drinks for tolls, but the game never requires drinking or sets amounts. Points, questions and short challenges work just as well.", cta: "Play for free", sections: [
      { heading: "How to set up a group game", items: [
        { title: "1. Choose the players", body: "Use one phone. Hot Potato supports 3 to 8 people; there are also solo and two-player options." },
        { title: "2. Agree on the toll", body: "Decide what happens at a toll before the first card. Keep any drink voluntary and let everyone pass without explanation." },
        { title: "3. Predict the cards", body: "The site shuffles 52 cards. A correct prediction moves you forward; a wrong one sends you back. Complete the last question to finish." },
        {"title": "Keep the score separate from the toll", "body": "Points mode records one point per miss and two per toll crossing, including backward crossings. This is a digital score, never an amount to drink. Use a music recommendation, a simple preference question or a mark on paper instead. Anyone can skip the task and confirm the toll to continue."},
    ] },
      { heading: "Is El Peaje a free drinking game?", body: "Playing is free, with no sign-up or app download. You can adapt the tolls for an adult get-together, or play a completely alcohol-free card game.", link: "rules", linkLabel: "See the full rules" },
      { heading: "Can we play without alcohol?", body: "Yes. Use points, water, questions or short challenges. The Safe Toll mode is designed for drink-free penalties, and anyone can skip a challenge.", link: "play", linkLabel: "Start the game" },
    ] },
    party: { title: "El Peaje: a free online party card game", description: "Set up El Peaje for a party: quick rules, group modes and flexible tolls. Play online for free with one phone and no sign-up.", kicker: "Before the night starts", intro: "Bring one phone and a group of friends. El Peaje shuffles the cards and guides the game; you choose the mode and what each toll means.", cta: "Start the party game", sections: [
      { heading: "A quick party setup", items: [
        { title: "Pick your group", body: "Play as a pair or select Hot Potato for 3 to 8 people sharing the phone." },
        { title: "Choose a toll", body: "Agree on points, questions or brief challenges. Any drink is optional and only for adults." },
        { title: "Take the first guess", body: "Predict higher or lower, then work through the route. A wrong answer moves you back." },
        {"title": "One screen, one group", "body": "The QR opens the website but does not connect devices. Assign player numbers before starting Hot Potato and agree when the session ends. If the group changes, start a new game with the new player count. Above eight people, form separate tables or teams with one operator each."},
    ] },
      { heading: "Which mode should we choose?", body: "Classic and Easy make a short introduction. Points adds a score to compare. Hot Potato adds surprise phone passes after some correct guesses.", link: "modes", linkLabel: "Compare all six modes" },
    ] },
    faq: { title: "El Peaje FAQ: rules, players and tolls", description: "Answers about El Peaje's cards, free online play, group size, tolls, alcohol-free options and the end of a game.", kicker: "Quick answers", intro: "Here are the most common questions before you play El Peaje online.", cta: "Play now", sections: [
      { heading: "Frequently asked questions", items: [
        { title: "Is El Peaje free to play online?", body: "Yes. Open it in a browser; there is no account, download or physical deck to prepare." },
        { title: "How many people can play?", body: "Play alone or in a pair. Hot Potato supports groups of 3 to 8 with a shared phone." },
        { title: "Do we need to drink?", body: "No. The group defines the toll. Points, questions, water and brief challenges all work without alcohol." },
        { title: "What does an ace count as?", body: "An ace is high. In higher-or-lower, a card with the same rank as the reference is a miss." },
        { title: "Are cards repeated?", body: "No. The site draws from a shuffled 52-card deck without repeating cards during that game." },
        { title: "When does a game end?", body: "When you clear the last question, use up the deck or, in cooperative mode, reach six failures." },
      ], link: "rules", linkLabel: "Read the full rules" },
      {"heading": "Does it work on mobile and desktop?", "body": "Use a current browser on either device. Games are held in browser memory and disappear when you reload or close the tab. Separate phones create separate games; sharing a link does not transfer cards or progress. There is no installed offline mode."},
    ] },
  },
};
