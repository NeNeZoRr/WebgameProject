const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timerDisplay = document.getElementById("timer");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".new-word");
const checkBtn = document.querySelector(".verify-word");

let correctWord, timer;

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

const updateTimerDisplay = remainingTime => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.innerText = formattedTime;
};

const initGame = (words, wordText, hintText, correctWord, inputField) => {
    let randomObj = words[Math.floor(Math.random() * word.length)];
    let wordArrayShuffled = randomObj.word.split("");
    for (let i = wordArrayShuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArrayShuffled[i], wordArrayShuffled[j]] = [wordArrayShuffled[j], wordArrayShuffled[i]];
    }
    wordText.innerText = wordArrayShuffled.join("");
    hintText.innerText = randomObj.hint;
    correctWord.value = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    initTimer(30);
};
console.log("wordArray length:", wordArray.length);

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
