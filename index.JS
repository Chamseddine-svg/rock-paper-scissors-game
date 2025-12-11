let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let a = Math.floor(Math.random() * 3);
    switch (a) {
        case 0: return "rock";
        case 1: return "paper";
        case 2: return "scissors";
    }
}

function getHumanChoice() {
    return (prompt("Enter Your Move [rock, paper, scissors]")).toLowerCase();
}

function playRound() {
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();

    alert(`Computer chose ${computerChoice}`);

    if (
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        console.log(`You Won! ${humanChoice} beats ${computerChoice}`);
        humanScore++;
    } else if (humanChoice === computerChoice) {
        console.log(`It's a tie! ${humanChoice}`);
    } else {
        console.log(`You Lost! ${computerChoice} beats ${humanChoice}`);
        computerScore++;
    }

    console.log(`Score You: ${humanScore}, Computer: ${computerScore}`);
}

function playGame(a = parseInt(prompt("How many games you want to play?"))) {
    for (let i = 1; i <= a; i++) {
        playRound();
    }

    alert(`Final Score You: ${humanScore}, Computer: ${computerScore}`);
    console.log(`Final Score You: ${humanScore}, Computer: ${computerScore}`);
}

playGame();
