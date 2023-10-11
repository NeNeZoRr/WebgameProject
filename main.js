import wordArray from './word.js';

// Dom Tree
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
const messageDisplay = document.querySelector(".message-display");
const resetButton = document.getElementById("reset-button");

let correctWord, gameTimer, gameStarted = false;
let score = 0;

//Word Generate
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

let timeRemaining = 180;

const resetGame = () => {
    clearInterval(gameTimer);
    timeRemaining = 180;
    updateGameTimerDisplay(timeRemaining);
    gameStarted = false;
    score = 0;
    scoreCounter.innerText = "0";
};

const startGame = () => {
    resetGame();
    generateWord();
    initGameTimer(timeRemaining);
};

//Event Listner Refresh//
refreshBtn.addEventListener("click", () => {
    inputField.value = "";
    if (!gameStarted) {
        startGame();
    }
});

resetButton.addEventListener("click", () => {
    resetGame();
    initGame();
});
// Timer //
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
                showMessage("Winner!");
            } else {
                showMessage("Game over");
            }
            initGame();
        }
    }, 1000);
};

const updateGameTimerDisplay = remainingTime => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    gameTimerDisplay.innerText = formattedTime;
};

//Game Intilization// 
const initGame = () => {
    wordText.innerText = "";
    hintText.innerText = "";
    inputField.value = "";
    gameStarted = false;
    gameTimerDisplay.style.display = "none";
    messageDisplay.style.display = "none";
};

//Score Tracker//
checkBtn.addEventListener("click", () => {
    let userWord = inputField.value.toLowerCase();
    inputField.value = "";
    if (!userWord) {
        showMessage("Please enter the word to check!");
        return;
    }
    if (userWord === correctWord) {
        score++;
        scoreCounter.innerText = score;
        showMessage("Correct answer! +1 point");
    } else {
        score--;
        scoreCounter.innerText = score;
        showMessage("Incorrect answer. The correct word is: " + correctWord + " -1 point");
    }
    generateWord();
});

//Event Listner// 
instructionsBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", event => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

//Message Display//
const showMessage = message => {
    messageDisplay.innerText = message;
    messageDisplay.style.display = "block";
    setTimeout(() => {
        messageDisplay.style.display = "none";
    }, 2000);
};
