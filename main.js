
let timerInterval;
let time_limit = 30; 

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(time_limit);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (time_limit === 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').textContent = 'Time Over';
        } else {
            time_limit--;
            updateTimerDisplay();
        }
    }, 1000); 
}

startTimer();
