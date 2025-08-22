let randomNumber;

fetch('http://127.0.0.1:5001/start_game')
    .then(response => response.json())
    .then(data => {
        randomNumber = data.number;
    });
let attempts = 0;

document.getElementById('submit-sudoku').addEventListener('click', function() {
    const userGuess = parseInt(document.getElementById('guess').value);
    const numberToGuess = randomNumber; // Use the random number from the server
    attempts++;

    if (userGuess < numberToGuess) {
        document.getElementById('result').innerText = 'Too low! Try again.';
    } else if (userGuess > numberToGuess) {
        document.getElementById('result').innerText = 'Too high! Try again.';
    } else {
        document.getElementById('result').innerText = `Correct! You guessed it in ${attempts} attempts.`;
    }
});
