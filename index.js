// script.js

let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = [];
let timeWhenStopped = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - timeWhenStopped;
        timerInterval = setInterval(updateTime, 10);
        running = true;
        toggleButtons();
    }
}

function stop() {
    if (running) {
        clearInterval(timerInterval);
        timeWhenStopped = difference;
        running = false;
        toggleButtons();
    }
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    timeWhenStopped = 0;
    display.textContent = '00:00:00';
    laps = [];
    lapsList.innerHTML = '';
    toggleButtons();
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = 
        (hours > 9 ? hours : "0" + hours) + ":" +
        (minutes > 9 ? minutes : "0" + minutes) + ":" +
        (seconds > 9 ? seconds : "0" + seconds);
}

function recordLap() {
    if (running) {
        laps.push(display.textContent);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${display.textContent}`;
        lapsList.appendChild(lapItem);
    }
}

function toggleButtons() {
    startButton.disabled = running;
    stopButton.disabled = !running;
    resetButton.disabled = running && laps.length === 0;
    lapButton.disabled = !running;
}

toggleButtons(); // Set initial button states
