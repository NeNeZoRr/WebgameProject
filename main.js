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

// Game Initialization variables
let correctWord, gameTimer, gameStarted = false;
let score = 0;

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
    inputField.value = "";
    gameStarted = false;
    score = 0;
    scoreCounter.innerText = score;
};

// Event listener for the "New Word" button
refreshBtn.addEventListener("click", () => {
    initGame();
    initGameTimer(180); // 180 seconds = 3 minutes
    gameStarted = true;
    generateWord();
});

// Generate a new word function
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

// Event listener for the "Verify Word" button
checkBtn.addEventListener("click", () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Please enter the word to check!");
    if (userWord !== correctWord) {
        alert(`Oops! ${userWord} is not the correct word`);
    } else {
        score++;
        scoreCounter.innerText = score;
    }
    generateWord();
});

// Initially hide the game timer
gameTimerDisplay.style.display = "none";
