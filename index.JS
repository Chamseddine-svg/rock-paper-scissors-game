let humanScore = 0;
let computerScore = 0;
let currentRound = 0;
let totalRounds = 0;
let gameActive = false;     // only true after setting totalRounds

// DOM elements with test ids
const humanScoreSpan = document.getElementById('human-score');
const computerScoreSpan = document.getElementById('computer-score');
const roundResultDiv = document.querySelector('[data-testid="round-result"]');
const winnerMessageDiv = document.querySelector('[data-testid="winner-message"]');
const totalRoundsSpan = document.getElementById('total-rounds-display');
const currentRoundSpan = document.getElementById('current-round');

const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resetBtn = document.getElementById('reset');

// Helper: computer choice
function getComputerChoice() {
    const random = Math.floor(Math.random() * 3);
    switch (random) {
        case 0: return 'rock';
        case 1: return 'paper';
        case 2: return 'scissors';
    }
}

// Update displayed scores and round info
function updateUI() {
    humanScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;
    totalRoundsSpan.textContent = totalRounds;
    currentRoundSpan.textContent = currentRound;
}

function setRoundResult(message) {
    roundResultDiv.textContent = message;
}

function setWinnerMessage(message) {
    winnerMessageDiv.textContent = message;
}

function disableButtons(disabled) {
    rockBtn.disabled = disabled;
    paperBtn.disabled = disabled;
    scissorsBtn.disabled = disabled;
}

// End of game: show overall winner based on scores
function endGame() {
    gameActive = false;
    disableButtons(true);
    let finalMessage = '';
    if (humanScore > computerScore) {
        finalMessage = `GAME OVER - YOU WIN (${humanScore} to ${computerScore})`;
    } else if (computerScore > humanScore) {
        finalMessage = `GAME OVER - COMPUTER WINS (${computerScore} to ${humanScore})`;
    } else {
        finalMessage = `GAME OVER - TIE! (${humanScore} each)`;
    }
    setWinnerMessage(finalMessage);
    setRoundResult('Game finished. Press NEW GAME to play again.');
}

// Play one round
function playRound(playerChoice) {
    if (!gameActive) {
        setRoundResult('No active game. Press NEW GAME and enter number of rounds.');
        return;
    }

    // if all rounds already played, ignore
    if (currentRound >= totalRounds) {
        setRoundResult('Game already finished. Press NEW GAME.');
        return;
    }

    const computerChoice = getComputerChoice();
    let resultMessage = '';

    if (playerChoice === computerChoice) {
        resultMessage = `ROUND ${currentRound+1}: TIE - both ${playerChoice.toUpperCase()}.`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultMessage = `ROUND ${currentRound+1}: YOU WIN! ${playerChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}.`;
        humanScore++;
    } else {
        resultMessage = `ROUND ${currentRound+1}: YOU LOSE! ${computerChoice.toUpperCase()} beats ${playerChoice.toUpperCase()}.`;
        computerScore++;
    }

    currentRound++;
    updateUI();
    setRoundResult(resultMessage);

    // check if game finished
    if (currentRound >= totalRounds) {
        endGame();
    }
}

// Start a new game with user‑specified number of rounds
function startNewGame() {
    let input = prompt('How many games (rounds) do you want to play?', '3');
    if (input === null) {
        // user cancelled: keep previous state but optionally disable buttons
        setRoundResult('Game cancelled. Press NEW GAME to try again.');
        return;
    }
    let rounds = parseInt(input, 10);
    if (isNaN(rounds) || rounds <= 0) {
        setRoundResult('Invalid number. Please enter a positive integer (e.g., 3). Try again.');
        return;
    }

    // reset game state
    humanScore = 0;
    computerScore = 0;
    currentRound = 0;
    totalRounds = rounds;
    gameActive = true;

    // clear messages
    setRoundResult('');
    setWinnerMessage('');

    // enable buttons
    disableButtons(false);
    updateUI();

    setRoundResult(`Game started! Best of ${totalRounds} rounds. Make your move.`);
}

// Reset / New Game button behaviour
function resetGame() {
    startNewGame();
}

// Attach event listeners
rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));
resetBtn.addEventListener('click', resetGame);

// Initialise: wait for user to click NEW GAME or auto‑prompt on page load
// Optionally prompt immediately:
window.addEventListener('load', () => {
    startNewGame();
});