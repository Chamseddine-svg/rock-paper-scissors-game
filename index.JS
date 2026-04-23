// ------------------------------
// Rock Paper Scissors Game Logic
// Player selects via buttons vs computer
// User defines number of rounds, final winner based on total score
// ------------------------------

// Game state variables
let humanScore = 0;
let computerScore = 0;
let currentRound = 0;
let totalRounds = 0;
let gameActive = false;          // Only true after user sets number of games

// ------------------------------
// DOM Element References (with data-testid attributes for testing)
// ------------------------------
const humanScoreSpan = document.getElementById('human-score');
const computerScoreSpan = document.getElementById('computer-score');
const roundResultDiv = document.querySelector('[data-testid="round-result"]');
const winnerMessageDiv = document.querySelector('[data-testid="winner-message"]');
const totalRoundsSpan = document.getElementById('total-rounds-display');
const currentRoundSpan = document.getElementById('current-round');
const computerChoiceSpan = document.getElementById('computer-choice-display');

// Buttons
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resetBtn = document.getElementById('reset');

// ------------------------------
// Helper Functions
// ------------------------------

// Random computer selection: returns 'rock', 'paper', or 'scissors'
function getComputerChoice() {
    const random = Math.floor(Math.random() * 3);
    switch (random) {
        case 0: return 'rock';
        case 1: return 'paper';
        case 2: return 'scissors';
    }
}

// Update scoreboard and round counters on the page
function updateUI() {
    humanScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;
    totalRoundsSpan.textContent = totalRounds;
    currentRoundSpan.textContent = currentRound;
}

// Display round result text
function setRoundResult(message) {
    roundResultDiv.textContent = message;
}

// Display overall winner message
function setWinnerMessage(message) {
    winnerMessageDiv.textContent = message;
}

// Update the visual computer choice indicator
function setComputerChoiceDisplay(choice) {
    computerChoiceSpan.textContent = choice.toUpperCase();
}

// Enable or disable game buttons (used when game ends or resets)
function disableButtons(disabled) {
    rockBtn.disabled = disabled;
    paperBtn.disabled = disabled;
    scissorsBtn.disabled = disabled;
}

// Called when totalRounds reached: declare final winner and freeze game
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
    // Round result is NOT cleared – the last round's outcome stays visible
}

// Core game logic for one round
function playRound(playerChoice) {
    // Guard: game must be active and rounds remaining
    if (!gameActive) {
        setRoundResult('No active game. Press NEW GAME and enter number of rounds.');
        return;
    }
    if (currentRound >= totalRounds) {
        setRoundResult('Game already finished. Press NEW GAME.');
        return;
    }

    // Get computer's move and update visual display
    const computerChoice = getComputerChoice();
    setComputerChoiceDisplay(computerChoice);

    let resultMessage = '';

    // Determine winner
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

    // Advance round and update UI
    currentRound++;
    updateUI();
    setRoundResult(resultMessage);

    // If all rounds played, finish the game
    if (currentRound >= totalRounds) {
        endGame();
    }
}

// Initialize or reset game: ask user for number of games
function startNewGame() {
    let input = prompt('How many games (rounds) do you want to play?', '3');
    if (input === null) {
        setRoundResult('Game cancelled. Press NEW GAME to try again.');
        return;
    }
    let rounds = parseInt(input, 10);
    if (isNaN(rounds) || rounds <= 0) {
        setRoundResult('Invalid number. Please enter a positive integer (e.g., 3). Try again.');
        return;
    }

    // Reset all state variables
    humanScore = 0;
    computerScore = 0;
    currentRound = 0;
    totalRounds = rounds;
    gameActive = true;

    // Clear messages and computer choice placeholder
    setRoundResult('');
    setWinnerMessage('');
    setComputerChoiceDisplay('---');

    // Enable buttons and update score displays
    disableButtons(false);
    updateUI();

    setRoundResult(`Game started! Best of ${totalRounds} rounds. Make your move.`);
}

// Reset button handler: just call startNewGame
function resetGame() {
    startNewGame();
}

// ------------------------------
// Event Listeners
// ------------------------------
rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));
resetBtn.addEventListener('click', resetGame);

// On page load, automatically start a new game
window.addEventListener('load', () => {
    startNewGame();
});