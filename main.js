// Import the wordArray from word.js
import wordArray from './word.js';

// DOM elements
const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const gameTimerDisplay = document.getElementById("game-timer");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".new-word");
const checkBtn = document.querySelector(".verify-word");
const scoreCounter = document.getElementById("score-counter");
const instructionsBtn = document.querySelector(".instructions-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");

// Game Initialization variables
let correctWord, gameTimer, gameStarted = false;
let score = 0;

// Function to generate a new word
const generateWord = () => {
    let randomObj = wordArray[Math.floor(Math.random() * wordArray.length)];
    let wordArrayShuffled = randomObj.word.split("");
    for (let i = wordArrayShuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArrayShuffled[i], wordArrayShuffled[j]] = [wordArrayShuffled[j], wordArrayShuffled[i]];
    }
    wordText.innerText = wordArrayShuffled.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
};

// Timer function
const initGameTimer = maxTime => {
    clearInterval(gameTimer);
    gameTimerDisplay.style.display = "block";
    gameTimer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            updateGameTimerDisplay(maxTime);
        } else {
            clearInterval(gameTimer);
            if (score >= 15) {
                alert("Winner!");
            } else {
                alert("Game over");
            }
            initGame();
        }
    }, 1000);
};

// Timer display function
const updateGameTimerDisplay = remainingTime => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    gameTimerDisplay.innerText = formattedTime;
};

// Function to initialize the game
const initGame = () => {
    wordText.innerText = "";
    hintText.innerText = "";
    inputField.value = ""; // Clear the input field
    gameStarted = false;
    score = 0;
    scoreCounter.innerText = score;
    gameTimerDisplay.style.display = "none"; // Hide the game timer
};

// Event listener for the "New Word" button
refreshBtn.addEventListener("click", () => {
    inputField.value = ""; // Clear the input field
    initGame();
    generateWord(); // Generate a new word
    initGameTimer(180); // 180 seconds = 3 minutes
    gameStarted = true;
});

// Event listener for the "Verify Word" button
checkBtn.addEventListener("click", () => {
    let userWord = inputField.value.toLowerCase();
    inputField.value = ""; // Clear the input field
    if (!userWord) {
        alert("Please enter the word to check!");
        return;
    }
    if (userWord === correctWord) {
        score++;
        scoreCounter.innerText = score;
        alert("Correct answer!");
    } else {
        score--;
        scoreCounter.innerText = score;
        alert("Oops! Incorrect answer.");
    }
    generateWord(); // Generate a new word
});

// Event listener for the "Game Instructions" button
instructionsBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Event listener for the close button in the modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Event listener to close the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
