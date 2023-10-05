const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".new-word");
const checkBtn = document.querySelector(".verify-word");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");

let correctWord, timer, gameStarted = false;

// Function to start the game and timer
function startGame() {
    if (gameStarted) return;
    gameStarted = true;

    startButton.style.display = "none";


    document.getElementById("word-input").style.display = "block";
    document.querySelector(".new-word").style.display = "block";
    document.querySelector(".verify-word").style.display = "block";

    initTimer(30);
}


startButton.addEventListener("click", startGame);

// Function to initialize the timer
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            updateTimerDisplay(maxTime);
        } else {
            clearInterval(timer);
            alert(`Time's up! ${correctWord.toUpperCase()} was the correct word`);
            initGame();
        }
    }, 1000);
};

// Function to update the timer display
const updateTimerDisplay = remainingTime => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.innerText = formattedTime;
};

// Function to initialize the game
const initGame = () => {
    gameStarted = false;
    startButton.style.display = "block";
    startButton.innerText = "Start";
    initTimer(0);
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
};

// Function to check the entered word
const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Please enter the word to check!");
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not the correct word`);
    clearInterval(timer);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
};


refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);


initGame();
