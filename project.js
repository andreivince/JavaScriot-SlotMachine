// DEPOSIT OF USER
// We need to use a package called prompt-sync to grab user input.

const prompt = require("prompt-sync")();

function deposit() {
    while (true) { // While it's a valid number.
        const deposit_amount = prompt("Enter a deposit: ");
        const numberDeposit = parseFloat(deposit_amount); // String to Number.

        if (isNaN(numberDeposit) || numberDeposit <= 0) { // If it's not a number OR number is less or equal to 0.
            console.log("Invalid Deposit Amount."); // Print statement for JavaScript.
        } else {
            return numberDeposit;
        }
    }
}

// COLLECT LINES
function getNumberofLines() {
    while(true) {
        const numberLines = prompt("Enter a number of lines: (1-3) ")
        const numberofLinesConverted = parseFloat(numberLines)

        if (isNaN(numberofLinesConverted) || numberofLinesConverted > 3 || numberofLinesConverted < 1) {
            console.log("Invalid Number of Lines")
        } else {
            return numberofLinesConverted
        }
    }
}

// GET BET
function getBet() {
    while(true) {
        const bet = prompt("Enter a total bet: ")
        const betNun = parseFloat(bet)

        if (isNaN(betNun) || betNun > balance || betNun < 1) {
            console.log("Invalid Try Again")
        } else {
            return betNun
        }
    }
}


let balance = deposit()
const numberOfLines = getNumberofLines()
const bet = getBet()