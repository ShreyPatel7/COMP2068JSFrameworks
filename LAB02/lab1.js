// Importing the prompt module to get the response from the user
const prompt = require('prompt');

// an constanr array for the total available options for the game
const options = ['ROCK', 'PAPER', 'SCISSORS'];

// Function to get the users response
function getUserInput() {
    
    prompt.get(['userSelection'], function (err, result) {
        // Handling any errors that might come during users input
        if (err) { 
            // Printing the error message in the console
            return console.error(err); 
        }

        // Extracting the users choice from the result and convert it to uppercase letters
        const userSelection = result.userSelection.toUpperCase();
        
        // Validating the user input
        if (!options.includes(userSelection)) {
            // If the users input is not one of the valid options, prompt again for the user
            console.log("Invalid input. Please enter ROCK, PAPER, or SCISSORS.");
            getUserInput();
        } else {
            // If the users input is valid then proceed to generate the computers selection for the game
            console.log("User selected: " + userSelection);
            generateComputerSelection(userSelection);
        }
    });
}

// Function to generate the computers selection
function generateComputerSelection(userSelection) {
    // Generating a random number between 0 and 1
    const random = Math.random();
    // Initializing a variable to store the computers selection
    let computerSelection;

    // Determining the computer's selection based on the random number
    if (random >= 0 && random <= 0.34) {
        computerSelection = 'PAPER';
    } else if (random > 0.34 && random <= 0.67) {
        computerSelection = 'SCISSORS';
    } else {
        computerSelection = 'ROCK';
    }

    // Printing the computers selection
    console.log("Computer selected: " + computerSelection);
    // After generating the computers selection, proceeding to determine the winner
    determineWinner(userSelection, computerSelection);
}

// Function to determine the winner of the game
function determineWinner(userSelection, computerSelection) {
    // Initializing a variable to store the outcome of the game
    let outcome;

    // Determining the outcome based on the users and computers selections
    if (userSelection === computerSelection) {
        outcome = "It's a tie";
    } else if (
        (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        outcome = "User Wins";
    } else {
        outcome = "Computer Wins";
    }

    // Printing the outcome of the game
    console.log(outcome);
}

// Welcome message for the users playing the game
console.log("Welcome to Rock,Paper,Scissors game created by Shrey Patel using javascript and running in node environment.");
// Starting the game by prompting the user for their input
prompt.start();
getUserInput();