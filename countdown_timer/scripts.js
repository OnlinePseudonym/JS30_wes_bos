let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endtime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.customForm.minutes;

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(totalSeconds) {
    seconds = totalSeconds;
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    seconds %= 60;
    seconds = seconds.toString().padStart(2, '0');
    const display = `${hours}:${minutes}:${seconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours() % 12;
    const minute = end.getMinutes().toString().padStart(2, '0');
    endtime.textContent = `Be Back at ${hour}:${minute}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});
