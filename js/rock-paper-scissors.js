// Global variables

const roundsToWin = 5;
let screenCount = 0;
let round = 0;
let computers_choice = 0;
let players_choice = 0;
let gameOverMessage = "";
const scores = { player: 0, computer: 0 };
const round_info = {
  isWinner: false,
  playerWon: false,
};
const choiceNumberToString = {
  0: "rock",
  1: "paper",
  2: "scissors",
};
const choiceToNumber = {
  rock: 0,
  paper: 1,
  scissors: 2,
};

// DOM element variables

const interactiveArea = document.querySelector(".interactiveArea");
const stepTitle = interactiveArea.querySelector(".stepTitle");
const stepDescription = interactiveArea.querySelector(".stepDescription");
const stepForward = interactiveArea.querySelector(".stepForward");

const roundTitle = interactiveArea.querySelector(".roundTitle");
const roundInstructions = interactiveArea.querySelector(".roundInstructions");
const roundChoices = interactiveArea.querySelector(".roundChoices");
const roundButtons = roundChoices.querySelectorAll("button");

// DOM event listeners

// Actions for buttons

stepForward.addEventListener("click", (e) => {
  loadContent();
});

roundButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    players_choice = choiceToNumber[button.textContent];
    playRound();
    if (checkWinner()) {
      screenCount = 0;
      round = 0;
      computers_choice = 0;
      players_choice = 0;
      roundInstructions.innerHTML = "";
      roundTitle.innerHTML = "";
      stepTitle.innerHTML = "Game Over";
      stepDescription.innerHTML = gameOverMessage;
      roundInstructions.innerHTML =
        "Player Score : " +
        scores.player +
        " " +
        "Computer Score : " +
        scores.computer;
      roundButtons.forEach((button) => roundChoices.removeChild(button));
      stepForward.innerHTML = "Restart the Game";
      interactiveArea.appendChild(stepForward);
    }
  }),
);

// Dynamic instruction content

// the content displayed during the instruction steps

const stepTitles = {
  0: "** Warning **",
  1: "A little help from the good AI...",
};

const stepDescriptions = {
  0: "<p class='evilAI'>Hello stranger! I am a bad AI that wants to dominate the world through the game of ROCK, PAPER or SCISSORS! No one will ever stop me unless you or I win three rounds of rock-paper-scissors (yes, if I win that also counts!). <br>Good luck, muuuuahhahhahahahahahahhahaahahahha!</p>",
  1: "Hello brave human!! <p>I managed to hack into the bad AI but I don't have much time. I can only help you with explaining the rules of rock-paper-scissors I'm not strong enough to wipe the bad AI. Both you and the computer will pick one of the below choices:<ul><li™>- rock</li><li>- paper</li><li>- or scissors.</li></ul<p>The one who's selection trumps the other wins.<span> Rock beats scissors, </span><span>paper beats rock, </span><span>and scissors beat paper.</span> If your pick is identical then nothing happens the game continues without any of you getting score. I hope this helps.</p> <p>Good luck!!</p>",
};
const stepForwardTexts = {
  0: "Start ->",
  1: "Start ----->",
};

// Game functions

// Creates the first two screens which guides through the player the introduction and onto the game

function loadContent() {
  if (screenCount == 2) {
    game();
    return;
  }
  scores.player = 0;
  scores.computer = 0;
  stepTitle.innerHTML = stepTitles[screenCount];
  stepDescription.innerHTML = stepDescriptions[screenCount];
  stepForward.innerHTML = stepForwardTexts[screenCount];
  screenCount++;
}

// runs the game setup and initiates the first round

function game() {
  roundChoices.style.display = "";
  gameSetup();
  playRound();
}

// runs the round, if its round 1 it doesn't calculate and display standings

function playRound() {
  round++;
  computerPlay();
  roundTitle.innerHTML = `Round ${round}`;
  if (round === 1) {
    roundInstructions.innerHTML = `<p>Pick your choice</p>`;
    return;
  }
  calculateRoundOutcome();
  roundInstructions.innerHTML = displayRoundOutcome();
}

loadContent();

// sets up the game, removes the introductory screens and adds the game elements to the screen

function gameSetup() {
  stepTitle.innerHTML = "";
  stepDescription.innerHTML = "";
  interactiveArea.removeChild(stepForward);
  roundButtons.forEach((button) => roundChoices.appendChild(button));
  roundButtons.forEach((button) => (button.textContent = button.id));
  roundChoices.style.display = "flex";
  interactiveArea.style.gap = "60px";
}

// calculates computer choice

function computerPlay() {
  computers_choice = Math.floor(Math.random() * 3);
}

// compares the player's and the computer's response and calculates the result

function calculateRoundOutcome() {
  round_info.isWinner = true;
  if (computers_choice == players_choice) {
    round_info.isWinner = false;
    return;
  } else if (
    computers_choice == players_choice - 1 ||
    computers_choice == players_choice + 2
  ) {
    scores.player++;
    round_info.playerWon = true;
  } else {
    scores.computer++;
    round_info.playerWon = false;
  }
}

// checks if someone has reached the score required to win the game

function checkWinner() {
  if (scores.player == roundsToWin) {
    gameOverMessage =
      "Congratulations!! \n\nYou defeated me by winning " +
      roundsToWin +
      " rounds! \n\nExcellent work!";
    return true;
  } else if (scores.computer == roundsToWin) {
    gameOverMessage =
      "Congratulations!! \n\nYou let me win to save the world!\n\nYou're a grand strategist!";
    return true;
  } else {
    return false;
  }
}

// Helper functions

// gives back the standings in string depending on who's leading

const standings = () => {
  if (scores.player > scores.computer) {
    const message = scores.player < roundsToWin ? "You lead " : "You won ";
    return message + scores.player + "-" + scores.computer;
  } else if (scores.player < scores.computer) {
    const message =
      scores.computer < roundsToWin ? "The computer leads " : "Computer won ";
    return message + scores.computer + "-" + scores.player;
  } else {
    return "You are tied " + scores.player + "-" + scores.player;
  }
};

// displays the standings

function displayRoundOutcome() {
  let message = `<p>You both picked ${choiceNumberToString[computers_choice]}!<br> Nothing changed.<br>${standings()}.</p>`;
  if (!round_info.isWinner) {
    return message;
  }
  if (round_info.playerWon) {
    message = `${roundOutcomeMessage(choiceNumberToString[players_choice], choiceNumberToString[computers_choice])}<br> You won this round. `;
  } else {
    message = `${roundOutcomeMessage(choiceNumberToString[computers_choice], choiceNumberToString[players_choice])}<br> The computer won this round.`;
  }

  return `<p>The computer's choice was ${choiceNumberToString[computers_choice]}.<br>${message}<br>${standings()}.</p>`;
}

// capitalizes word

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

// generates the message for the round outcome depending on who won

function roundOutcomeMessage(winningChoice, losingChoice) {
  return `${capitalize(winningChoice)} beats ${losingChoice}.`;
}
