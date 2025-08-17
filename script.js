// ---- Sounds ----
const alarmSound = document.getElementById('alarm');
const clickSound = document.getElementById('click');

// ---- Switch Sections ----
function showSection(name) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(`section-${name}`).classList.add('active');
}

// ---- Digital Clock ----
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHour = String(hours).padStart(2, '0');

  document.getElementById('clock').textContent = `${formattedHour}:${minutes}:${seconds} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// ---- Timer ----
let timerInterval;
function startTimer() {
  const min = parseInt(document.getElementById('minutes').value) || 0;
  const sec = parseInt(document.getElementById('seconds').value) || 0;
  let time = min * 60 + sec;

  stopTimer();

  timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval);
      document.getElementById('timer').textContent = "00:00";
      alarmSound.play();
      alert("Time's up!");
      return;
    }

    time--;
    const m = String(Math.floor(time / 60)).padStart(2, '0');
    const s = String(time % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${m}:${s}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// ---- Stopwatch ----
let stopwatchInterval;
let time = 0;
let running = false;

function updateStopwatch() {
  const h = String(Math.floor(time / 3600)).padStart(2, '0');
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');
  document.getElementById('stopwatch').textContent = `${h}:${m}:${s}`;
}

function startStopwatch() {
  if (running) return;
  running = true;
  clickSound.play();
  stopwatchInterval = setInterval(() => {
    time++;
    updateStopwatch();
  }, 1000);
}

function pauseStopwatch() {
  running = false;
  clearInterval(stopwatchInterval);
  clickSound.play();
}

function resetStopwatch() {
  pauseStopwatch();
  time = 0;
  updateStopwatch();
  clickSound.play();
}

updateStopwatch();
