let humanScore = 0;
let computerScore = 0;
let gameActive = true;

// DOM elements with test ids
const humanScoreSpan = document.getElementById('human-score');
const computerScoreSpan = document.getElementById('computer-score');
const roundResultDiv = document.querySelector('[data-testid="round-result"]');
const winnerMessageDiv = document.querySelector('[data-testid="winner-message"]');

const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resetBtn = document.getElementById('reset');

function getComputerChoice() {
    const random = Math.floor(Math.random() * 3);
    switch (random) {
        case 0: return 'rock';
        case 1: return 'paper';
        case 2: return 'scissors';
    }
}

function updateScoreDisplay() {
    humanScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;
}

function setRoundResult(message) {
    roundResultDiv.textContent = message;
}

function disableButtons(disabled) {
    rockBtn.disabled = disabled;
    paperBtn.disabled = disabled;
    scissorsBtn.disabled = disabled;
}

function checkWinner() {
    if (humanScore === 5) {
        winnerMessageDiv.textContent = 'YOU WIN THE GAME!';
        gameActive = false;
        disableButtons(true);
    } else if (computerScore === 5) {
        winnerMessageDiv.textContent = 'COMPUTER WINS THE GAME!';
        gameActive = false;
        disableButtons(true);
    } else {
        // no winner yet, ensure buttons enabled if game active
        if (gameActive) disableButtons(false);
    }
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    gameActive = true;
    updateScoreDisplay();
    setRoundResult('');
    winnerMessageDiv.textContent = '';
    disableButtons(false);
}

function playRound(playerChoice) {
    if (!gameActive) {
        setRoundResult('Game over. Press NEW GAME to continue.');
        return;
    }

    const computerChoice = getComputerChoice();
    let resultMessage = '';

    if (playerChoice === computerChoice) {
        resultMessage = `TIE! Both chose ${playerChoice.toUpperCase()}.`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultMessage = `YOU WIN! ${playerChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}.`;
        humanScore++;
    } else {
        resultMessage = `YOU LOSE! ${computerChoice.toUpperCase()} beats ${playerChoice.toUpperCase()}.`;
        computerScore++;
    }

    updateScoreDisplay();
    setRoundResult(resultMessage);
    checkWinner();
}

// attach event listeners
rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));
resetBtn.addEventListener('click', resetGame);

// initialise game
resetGame();