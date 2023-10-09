import wordArray from './word.js';

const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timerDisplay = document.getElementById("timer");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".new-word");
const checkBtn = document.querySelector(".verify-word");
const scoreCounter = document.getElementById("score-counter"); 

let correctWord, timer, gameStarted = false;
let score = 0; 

const initTimer = maxTime => {
    clearInterval(timer);
    timerDisplay.style.display = "block"; 
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            updateTimerDisplay(maxTime);
        } else {
            clearInterval(timer);
            if (gameStarted) {
                alert(`Time's up! ${correctWord.toUpperCase()} was the correct word`);
                initGame();
            }
        }
    }, 1000);
};

const updateTimerDisplay = remainingTime => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.innerText = formattedTime;
};

const initGame = () => {
    let randomObj = wordArray[Math.floor(Math.random() * wordArray.length)];
    let wordArrayShuffled = randomObj.word.split("");
    for (let i = wordArrayShuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArrayShuffled[i], wordArrayShuffled[j]] = [wordArrayShuffled[j], wordArrayShuffled[i]];
    }
    wordText.innerText = wordArrayShuffled.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    gameStarted = true; 
    initTimer(30);
};

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Please enter the word to check!");
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not the correct word`);
    clearInterval(timer);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);

    score++;
    scoreCounter.innerText = score;

    initGame();
};

refreshBtn.addEventListener("click", () => {
    gameStarted = false;
    clearInterval(timer);
    timerDisplay.style.display = "none";
    initGame();
});

checkBtn.addEventListener("click", checkWord);


timerDisplay.style.display = "none";
