// GLOBAL VARIABLES AND IMPORTS ON THE TOP

const prompt = require("prompt-sync")();

// Set ROWS and COLS as global variables
const ROWS = 3 //Global Variables are always in caps-lock
const COLS = 3

// Define the number of symbols per type and their values
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

// DEPOSIT OF USER
// We need to use a package called prompt-sync to grab user input.

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
function getBet(balance, lines) {
    while(true) {
        const bet = prompt("Enter the bet per line: ")
        const betNun = parseFloat(bet)

        if (isNaN(betNun) || betNun > balance / lines|| betNun < 1) {
            console.log("Invalid Try Again")
        } else {
            return betNun
        }
    }
}

// SPIN FUNCTION
function spin() {
    const symbols = [] // Initialize an empty array called symbols
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count ; i++ ) {
            symbols.push(symbol) // Append the symbol into symbols array
        }
    }
    const reels = [] // Initialize an empty array called reels
    for (let i =0; i < COLS; i++) {
        reels.push([]) // Push an empty array into reels
        const reelSymbols = [...symbols] // Copy symbols array using the spread operator
            for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length) // Generate a random index using reelSymbols length
                const selectedSymbol = reelSymbols[randomIndex] // Access the symbol using the random index
                reels[i].push(selectedSymbol) // Add the selected symbol to reels[i]
                reels[i].splice(randomIndex, 1) // Remove the symbol from reelSymbols

        }
    }
    return reels
}

// TRANSPOSE FUNCTION
function transpose(reels) {
    const rows = [] // Initialize an empty array called rows
    for (let i = 0; i < ROWS; i++) {
        rows.push([]) // Push an empty array into rows
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]) // Push the symbol into rows[i][j]
        }
    }
    return rows
}

// PRINT ROWS FUNCTION
function printRows(rows) {
    for (const row of rows) {
        let row_string = ""
        for (const [i, symbol] of row.entries()) { 
            // The .entries() method is used to return an array iterator object with key/value pairs. It is used in this code to iterate through an array and get the index and value of each element in the array.
            row_string += symbol // Add the symbol into row_string
            if (i != row.length - 1 ) {
                row_string += " | " // Add a separator until the last symbol
            }
        }
        console.log(row_string) // Log the final row_string
    }
}

// GET WIN FUNCTION
function getWin(rows, bet, lines) {
    let winnings = 0

    for (let row =0; row < lines; row++) {
        const symbols = rows[row]
        let allSame = true

        for (const symbol of symbols ) {
            if (symbol != symbols[0]) {
                allSame = false
                break
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings

}

// GAME FUNCTION
function game() {
    let balance = deposit() // Call the deposit function to get the player balance
    while (true) { // While it's true, the game will continue
        const numberOfLines = getNumberofLines() // Call the getNumberofLines function to get the number of lines
        const bet = getBet(balance, numberOfLines) // Call the getBet function to get the bet
        balance -= bet * numberOfLines // Decrease the balance
        console.log("That's your balance $ " + balance) // Show the balance
        const reels = spin() // Call the spin function to get the reels
        const rows = transpose(reels) // Call the transpose function to get the rows
        printRows(rows) // Call the printRows function to print the rows
        const winning = getWin(rows, bet, numberOfLines) // Call the getWin function to get the winnings
        balance += winning // Increase the balance
        console.log("You won, $" + winning.toString()) // Show the winnings
        console.log("Your balance now is $" + balance) // Show the new balance

        if (balance <= 0 ) { // If balance is zero or negative
            console.log("No money")
            break // End the game
        }

        const playAgain = prompt("You want to play again? (y/n)") // Ask if the player wants to play again

        if (playAgain != "y") break // If the player doesn't want to play again, end the game
    }
}

game() // Call the game function to start the game
