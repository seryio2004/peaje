import type { Translation } from "./types";
export const pt: Translation = {
  nav: { home: "Início", play: "Jogar", rules: "Como jogar", modes: "Modos de jogo", drinking: "Jogos de beber", party: "Para festas", faq: "Perguntas" },
  homeLabel: "Voltar ao início", guideLabel: "GUIA DO JOGO", footer: "Jogo de cartas online grátis para uma pessoa, casais ou grupos.", legalLabel: "Informações legais e privacidade (em espanhol)",
  pages: {
    home: { title: "El Peaje: jogo de cartas online grátis para festas", description: "Joga El Peaje online grátis. Adivinha as cartas, atravessa portagens e escolhe entre seis modos para 1 a 8 pessoas. Sem descarregar nem criar conta.", kicker: "52 cartas · 1 a 8 jogadores", intro: "El Peaje é um jogo de cartas online grátis para amigos, casais e jogadores a solo. Adivinha a carta seguinte para avançar. Se falhares, recuas; ao atravessar uma portagem, cumpres um desafio escolhido pelo grupo.", cta: "Jogar grátis", sections: [
      { heading: "Como funciona El Peaje?", body: "O site baralha 52 cartas. Começa com uma carta visível, adivinha se a próxima será maior ou menor e responde a perguntas sobre o naipe e a cor. Cada resposta certa faz-te avançar.", link: "rules", linkLabel: "Ler as regras" },
      { heading: "Um jogo de cartas para a próxima festa", body: "Joga sozinho, a dois por turnos ou partilha um telemóvel com 3 a 8 pessoas no modo Batata quente. Escolhe um percurso curto ou mais difícil.", link: "modes", linkLabel: "Comparar os modos" },
      { heading: "Procuras jogos de beber grátis online?", body: "El Peaje pode adaptar-se a uma reunião de adultos, mas beber é opcional. O grupo decide o significado da portagem: pontos, perguntas, um desafio curto ou uma bebida voluntária.", link: "drinking", linkLabel: "Ver o guia de jogos de beber" },
    ] },
    play: { title: "Jogar El Peaje online grátis", description: "Começa uma partida grátis de El Peaje no navegador. Escolhe modo e dificuldade e joga sozinho, a dois ou com até oito pessoas.", kicker: "Sem descarregar · Sem registo", intro: "Escolhe jogadores, modo e dificuldade abaixo. As cartas são baralhadas online, por isso podes começar já.", cta: "Começar partida", sections: [
      { heading: "Precisas das regras?", body: "Descobre como funcionam as previsões das cartas e as portagens antes de começar.", link: "rules", linkLabel: "Como jogar" },
      { heading: "Jogar com amigos?", body: "Batata quente foi criado para 3 a 8 pessoas com um telemóvel. Algumas cartas acertadas permitem passá-lo.", link: "modes", linkLabel: "Explorar modos de jogo" },
    ] },
    rules: { title: "Como jogar El Peaje: regras do jogo de cartas", description: "Aprende as regras de El Peaje: adivinha cartas, avança no percurso, cumpre portagens e descobre como acaba uma partida.", kicker: "Regras num minuto", intro: "O objetivo é completar um percurso de previsões com um baralho de 52 cartas. As respostas certas fazem-te avançar; os erros obrigam-te a recuar, por vezes através de uma portagem.", cta: "Jogar El Peaje", sections: [
      { heading: "Regras essenciais", items: [
        { title: "1. Começa com uma carta visível", body: "Esta é a carta de referência. O baralho é misturado no início e nenhuma carta se repete na mesma partida." },
        { title: "2. Adivinha a carta seguinte", body: "Primeiro escolhe maior ou menor. O ás é a carta mais alta e um valor igual conta como erro. Depois há perguntas sobre forma, cor e naipe exato." },
        { title: "3. Avança no percurso", body: "Uma resposta certa faz-te avançar. Um erro aumenta o contador e obriga-te a recuar uma posição. Uma portagem atravessada em qualquer direção tem de ser cumprida." },
        { title: "4. Completa o percurso", body: "Ganhas ao superar a última pergunta. A partida também termina quando acaba o baralho ou, no modo cooperativo, após seis erros." },
        {"title": "Uma jogada concreta", "body": "Com 6♥ como referência inicial, maior acerta com 10♣ mas falha com 6♦: valores iguais perdem independentemente do naipe. Um erro na primeira pergunta mantém a referência inicial. A portagem não consome cartas; cada resposta revelada retira uma carta do baralho."},
    ] },
      { heading: "O que é uma portagem?", body: "É uma paragem entre perguntas. Combinem antes de jogar uma consequência curta e segura: um ponto, uma pergunta ou um pequeno desafio. O álcool não é necessário.", link: "drinking", linkLabel: "Portagens sem álcool" },
    ] },
    modes: { title: "Modos de jogo e dificuldades de El Peaje", description: "Compara seis modos de El Peaje, incluindo Batata quente para 3 a 8 pessoas, e escolhe a dificuldade ideal.", kicker: "Escolhe o percurso", intro: "El Peaje oferece seis modos e percursos de comprimentos diferentes. As previsões mantêm-se; mudam a pontuação, os turnos ou o objetivo.", cta: "Escolher modo e jogar", sections: [
      { heading: "Seis formas de jogar", items: [
        { title: "Clássico", body: "Chega à última pergunta. Uma resposta certa faz-te avançar; um erro faz-te recuar. Este modo não acrescenta um objetivo de pontuação nem um limite de erros. Serve para aprender sozinho ou com outra pessoa que revela a carta e valida uma resposta dita em voz alta." },
        { title: "Por pontos", body: "Cada erro vale um ponto e cada portagem dois. Termina com a menor pontuação. Três erros e duas passagens pela portagem dão sete pontos. As passagens para trás também contam; comparem percursos concluídos na mesma dificuldade, pois cada partida baralha um novo baralho." },
        { title: "Cooperativo", body: "A equipa partilha um percurso e tenta terminá-lo antes do sexto erro. O sexto erro termina imediatamente a tentativa. Uma pessoa pode usar o telemóvel enquanto a equipa discute as respostas. O jogo mantém um percurso partilhado, sem perfis individuais." },
        { title: "Turnos rápidos", body: "Dois jogadores têm baralhos e percursos separados. Um erro passa a vez ao outro. Cada percurso tem um baralho misturado separadamente. Uma resposta certa mantém a vez; quando volta a ser a tua vez, retomas o erro ou a portagem pendente antes da próxima resposta." },
        { title: "Portagem segura", body: "Substitui as instruções da portagem por perguntas ou desafios curtos sem bebidas. As regras das cartas e os recuos continuam iguais. Preparem uma pergunta ou um desafio breve: o jogo altera as mensagens da portagem, mas não gera tarefas automaticamente." },
        { title: "Batata quente", body: "Para 3 a 8 pessoas com um telemóvel. Algumas cartas certas permitem passá-lo; se falhares, ficas com ele. No início, 20 das 51 cartas ocultas são escolhidas como cartas de passagem. Acertar uma delas pode permitir passar o telemóvel se a partida puder continuar. Confirma primeiro qualquer portagem e escolhe uma pessoa ou mantém o telemóvel. Não há temporizador." },
      ] },
      { heading: "Fácil, médio e difícil", body: "Fácil: três perguntas e uma portagem. Médio: quatro perguntas e uma portagem. Difícil: quatro perguntas e duas portagens. Batata quente tem Normal e Difícil; este acrescenta par ou ímpar.", link: "play", linkLabel: "Começar a jogar" },
    ] },
    drinking: { title: "Jogos de beber grátis online: El Peaje", description: "Procuras jogos de beber grátis? Joga El Peaje online com cartas e portagens escolhidas pelo grupo. Regras para jogar com ou sem álcool.", kicker: "Cartas para a próxima festa", intro: "El Peaje é um jogo de cartas online grátis para reuniões. Os adultos podem escolher uma variante com bebidas, mas o jogo não obriga a beber nem define quantidades. Pontos, perguntas e desafios curtos também funcionam.", cta: "Jogar grátis", sections: [
      { heading: "Preparar uma partida em grupo", items: [
        { title: "1. Escolham os jogadores", body: "Basta um telemóvel. Batata quente permite 3 a 8 pessoas; também há opções individuais e para dois." },
        { title: "2. Combinem a portagem", body: "Antes da primeira carta, decidam o que acontece na portagem. Qualquer bebida é voluntária e ninguém tem de justificar a recusa." },
        { title: "3. Adivinhem as cartas", body: "O site baralha 52 cartas. Acertar faz avançar, falhar faz recuar. Superem a última pergunta para terminar." },
        {"title": "Separar pontuação e portagem", "body": "O modo Pontos conta um ponto por erro e dois por passagem na portagem, incluindo recuos. É uma pontuação digital, nunca uma quantidade para beber. Usem uma recomendação musical, uma pergunta simples ou uma marca no papel. Qualquer pessoa pode saltar a tarefa e confirmar a portagem para continuar."},
    ] },
      { heading: "El Peaje é um jogo de beber grátis?", body: "Jogar é grátis, sem registo nem aplicação. Podem adaptar as portagens a uma reunião de adultos ou jogar completamente sem álcool.", link: "rules", linkLabel: "Ver todas as regras" },
      { heading: "É possível jogar sem álcool?", body: "Sim. Usem pontos, água, perguntas ou desafios curtos. O modo Portagem segura foi pensado para provas sem bebidas.", link: "play", linkLabel: "Iniciar o jogo" },
    ] },
    party: { title: "El Peaje para festas: regras e modos em grupo", description: "Prepara El Peaje para uma festa: regras rápidas, modos de grupo e portagens flexíveis. Joga grátis com um telemóvel.", kicker: "Antes de sair", intro: "Um telemóvel e alguns amigos chegam. El Peaje baralha as cartas e orienta a partida; vocês escolhem o modo e o significado das portagens.", cta: "Começar a festa", sections: [
      { heading: "Preparação rápida", items: [
        { title: "Escolham o grupo", body: "Joguem a dois ou escolham Batata quente para 3 a 8 pessoas." },
        { title: "Definam a portagem", body: "Combinem pontos, perguntas ou desafios curtos. As bebidas são opcionais e apenas para adultos." },
        { title: "Façam a primeira previsão", body: "Adivinhem maior ou menor e continuem ao longo do percurso." },
        {"title": "Um ecrã para o grupo", "body": "O QR abre o site mas não liga os dispositivos. Atribuam os números antes de começar Batata quente e combinem quando termina a sessão. Se o grupo mudar, iniciem outra partida com o novo número de pessoas. Acima de oito, formem mesas separadas ou equipas com um operador cada."},
    ] },
      { heading: "Qual é o melhor modo?", body: "Clássico e Fácil servem para começar. Por pontos acrescenta uma pontuação. Batata quente permite passagens surpresa do telemóvel após alguns acertos.", link: "modes", linkLabel: "Comparar os seis modos" },
    ] },
    faq: { title: "Perguntas frequentes sobre El Peaje", description: "Respostas sobre cartas, jogo online grátis, número de pessoas, portagens, alternativas sem álcool e fim da partida.", kicker: "Respostas rápidas", intro: "As perguntas mais comuns antes de jogar El Peaje online.", cta: "Jogar agora", sections: [
      { heading: "Perguntas frequentes", items: [
        { title: "El Peaje é grátis online?", body: "Sim. Abre no navegador; não precisas de conta, descarregar uma app ou preparar cartas físicas." },
        { title: "Quantas pessoas podem jogar?", body: "Sozinho, a dois ou com 3 a 8 pessoas a partilhar um telemóvel no modo Batata quente." },
        { title: "É preciso beber?", body: "Não. O grupo define a portagem. Pontos, perguntas, água e desafios curtos funcionam sem álcool." },
        { title: "Qual é o valor do ás?", body: "O ás é a carta mais alta. Em maior ou menor, uma carta do mesmo valor conta como erro." },
        { title: "As cartas repetem-se?", body: "Não. O baralho tem 52 cartas baralhadas sem repetição durante a partida." },
        { title: "Quando termina a partida?", body: "Depois da última pergunta, quando acaba o baralho ou, no modo cooperativo, após seis erros." },
      ], link: "rules", linkLabel: "Ler as regras completas" },
      {"heading": "Funciona no telemóvel e no computador?", "body": "Usa um navegador atual em ambos. As partidas ficam na memória do navegador e desaparecem ao recarregar ou fechar o separador. Telemóveis diferentes criam partidas separadas; partilhar o link não transfere cartas nem progresso. Não existe um modo offline instalado."},
    ] },
  },
};
