const inputPrompt = require('prompt');

// Function to prompt the user to choose ROCK, PAPER, or SCISSORS for the game
function getInput() {
    
    inputPrompt.start();

    // Getting user input from the console terminal.
    inputPrompt.get(['userPick'], function (err, result) {
        // Handling any errors that might occur during user input
        if (err) { 
            return console.error(err); 
        }

        // Extracting and converting the user's choice to uppercase
        const userPick = result.userPick.toUpperCase();
        // Logging the user's pick
        console.log("User picked: " + userPick);
        // Generating the computer's pick based on user's input
        generateComputerPick(userPick);
    });
}

// Function to generate the computer's selection
function generateComputerPick(userPick) {
    // Generating a random number between 0 and 1
    const randomNumber = Math.random();
    // Variable to store the computer's pick
    let computerPick;

    // Determining the computer's pick based on the random number
    if (randomNumber < 0.34) {
        computerPick = 'PAPER';
    } else if (randomNumber < 0.67) {
        computerPick = 'SCISSORS';
    } else {
        computerPick = 'ROCK';
    }

    // Logging the computer's pick
    console.log("Computer picked: " + computerPick);
    // Determining the winner based on the user's and computer's picks
    determineWinner(userPick, computerPick);
}

// Function to determine the winner of the game
function determineWinner(userPick, computerPick) {
    // Checking for a tie
    if (userPick === computerPick) {
        console.log("It's a tie");
    } 
    // Checking for user wins
    else if (
        (userPick === 'ROCK' && computerPick === 'SCISSORS') ||
        (userPick === 'PAPER' && computerPick === 'ROCK') ||
        (userPick === 'SCISSORS' && computerPick === 'PAPER')
    ) {
        console.log("User Wins");
    } 
    // If not a tie or user win, then computer wins
    else {
        console.log("Computer Wins");
    }
}

// Welcome message
console.log("Welcome to Rock, Paper, Scissors game by Shrey Patel created in Javascript");

// Start the game
getInput();
