const colorBox = document.querySelector(".color-box");
const colorOptions = document.querySelectorAll(".color-option");
const statusText = document.querySelector(".status");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("new-game");

let targetColor;
let score = 0;

// Function to generate a random color
function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Function to start a new game or refresh colors after a correct guess
function startNewGame() {
    const colors = [];
    for (let i = 0; i < 6; i++) {
        colors.push(getRandomColor());
    }

    targetColor = colors[Math.floor(Math.random() * 6)];
    colorBox.style.backgroundColor = targetColor;

    colorOptions.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.onclick = () => checkGuess(button, colors[index]);
    });

    statusText.textContent = "Make a guess!";
    statusText.style.color = "black";
}

// Function to check the user's guess
function checkGuess(button, selectedColor) {
    if (selectedColor === targetColor) {
        statusText.textContent = "Correct! 🎉";
        statusText.style.color = "green";
        score++;
        scoreDisplay.textContent = score;

        setTimeout(startNewGame, 1000); // Load new colors after 1 second
    } else {
        score--; // Deduct 1 point for a wrong guess
        scoreDisplay.textContent = score;
        statusText.textContent = `Wrong! ❌ (-1)`;
        statusText.style.color = "red";

        // Change the wrong color button to a new random color
        let newColor;
        do {
            newColor = getRandomColor();
        } while (newColor === selectedColor || newColor === targetColor); // Avoid repeating colors

        button.style.backgroundColor = newColor;
        button.onclick = () => checkGuess(button, newColor); // Update the event handler

        if (score < 0) {
            statusText.textContent = "Game Over! Restarting...";
            statusText.style.color = "black";

            setTimeout(() => {
                score = 0;
                scoreDisplay.textContent = score;
                startNewGame();
            }, 1500); // Reset after 1.5 seconds
        }
    }
}

// Event listener for the new game button
newGameButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = score;
    startNewGame();
});

// Start the game on page load
startNewGame();
