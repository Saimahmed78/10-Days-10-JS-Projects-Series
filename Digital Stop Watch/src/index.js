const stopwatchBtn = document.querySelector("#stopwatchBtn");
const countdownBtn = document.querySelector("#countdownBtn");
const countdownInputs = document.querySelector("#countdownInputs");
const startButton = document.querySelector("#startBtn");
const pauseButton = document.querySelector("#pauseBtn");
const resumeButton = document.querySelector("#resumeBtn");
const resetButton = document.querySelector("#resetBtn");
const stopwatchDisplay = document.querySelector("#stopwatchDisplay");
const countdownDisplay = document.querySelector("#countdownDisplay");
const inputHoursField = document.querySelector("#hours");
const inputMinutesField = document.querySelector("#minutes");
const inputSecondsField = document.querySelector("#seconds");
[inputHoursField, inputMinutesField, inputSecondsField].forEach((el) => {
  if (el === inputHoursField) {
    el.addEventListener("input", (e) => {
      if (e.target.value < 0) e.target.value = 0;
      if (e.target.value > 24) e.target.value = 24;
    });
  } else {
    el.addEventListener("input", (e) => {
      if (e.target.value < 0) e.target.value = 0;
      if (e.target.value > 59) e.target.value = 59;
    });
  }
});
let stopwatchStartTime = 0;
let countdownStartTime = 0;
let elapsedStopTime = 0;
let elapsedCountTime = 0;
let remainingCountTime = 0;
let isStopwatchRunning = false;
let isCountdownRunning = false;
let modeIsStopwatch = true;
let animationFrameId = null;

startButton.addEventListener("click", startClock);
pauseButton.addEventListener("click", pauseTime);
resumeButton.addEventListener("click", resumeTime);
resetButton.addEventListener("click", resetTime);
stopwatchBtn.addEventListener("click", showStopwatch);
countdownBtn.addEventListener("click", showCountdown);

function startClock() {
  if (modeIsStopwatch) {
    if (isStopwatchRunning) return;
    isStopwatchRunning = true;
    stopwatchStartTime = performance.now() - elapsedStopTime;
    animationFrameId = requestAnimationFrame(updateTime);
  } else {
    if (isCountdownRunning) return;
    const hrs = Number(inputHoursField.value) || 0;
    const mins = Number(inputMinutesField.value) || 0;
    const secs = Number(inputSecondsField.value) || 0;
    const total = hrs * 3600000 + mins * 60000 + secs * 1000;
    if (total <= 0) return;
    remainingCountTime = total;
    countdownStartTime = performance.now() - elapsedCountTime;
    isCountdownRunning = true;
    animationFrameId = requestAnimationFrame(updateTime);
  }
}

function updateTime() {
  if (modeIsStopwatch) {
    elapsedStopTime = performance.now() - stopwatchStartTime;
    const hrs = Math.floor(elapsedStopTime / 3600000)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((elapsedStopTime % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor((elapsedStopTime % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const ms = Math.floor(elapsedStopTime % 1000)
      .toString()
      .padStart(3, "0");
    stopwatchDisplay.textContent = `${hrs}:${mins}:${secs}:${ms}`;
    if (isStopwatchRunning)
      animationFrameId = requestAnimationFrame(updateTime);
  } else {
    const total = remainingCountTime;
    elapsedCountTime = performance.now() - countdownStartTime;
    let timeLeft = total - elapsedCountTime;
    if (timeLeft <= 0) {
      countdownDisplay.textContent = `00:00:00:000`;
      isCountdownRunning = false;
      elapsedCountTime = 0;
      cancelAnimationFrame(animationFrameId);
      countdownDisplay.classList.add("alert"); // Optional: add animation
      return;
    }

    const rH = Math.floor(timeLeft / 3600000)
      .toString()
      .padStart(2, "0");
    const rM = Math.floor((timeLeft % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const rS = Math.floor((timeLeft % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const rMS = Math.floor(timeLeft % 1000)
      .toString()
      .padStart(3, "0");
    countdownDisplay.textContent = `${rH}:${rM}:${rS}:${rMS}`;
    if (isCountdownRunning)
      animationFrameId = requestAnimationFrame(updateTime);
  }
}

function pauseTime() {
  cancelAnimationFrame(animationFrameId);
  if (modeIsStopwatch && isStopwatchRunning) {
    isStopwatchRunning = false;
    elapsedStopTime = performance.now() - stopwatchStartTime;
  } else if (!modeIsStopwatch && isCountdownRunning) {
    isCountdownRunning = false;
    elapsedCountTime = performance.now() - countdownStartTime;
  }
}
function resumeTime() {
  if (modeIsStopwatch && !isStopwatchRunning) {
    stopwatchStartTime = performance.now() - elapsedStopTime;
    isStopwatchRunning = true;
    animationFrameId = requestAnimationFrame(updateTime);
  } else if (!modeIsStopwatch && !isCountdownRunning) {
    countdownStartTime = performance.now() - elapsedCountTime;
    isCountdownRunning = true;
    animationFrameId = requestAnimationFrame(updateTime);
  }
}

function resetTime() {
  cancelAnimationFrame(animationFrameId);
  isStopwatchRunning = false;
  isCountdownRunning = false;
  elapsedStopTime = 0;
  elapsedCountTime = 0;
  remainingCountTime = 0;
  stopwatchDisplay.textContent = "00:00:00.000";
  countdownDisplay.textContent = "00:00:00.000";
  inputHoursField.value = "";
  inputMinutesField.value = "";
  inputSecondsField.value = "";
  countdownDisplay.classList.remove("celebrate");
}

function triggerAnimation() {
  countdownDisplay.classList.add("celebrate");
  setTimeout(() => {
    countdownDisplay.classList.remove("celebrate");
  }, 3000);
}

function showStopwatch() {
  modeIsStopwatch = true;
  stopwatchBtn.classList.add("active");
  countdownBtn.classList.remove("active");
  stopwatchDisplay.style.display = "block";
  countdownDisplay.style.display = "none";
  countdownInputs.style.display = "none";
}

function showCountdown() {
  modeIsStopwatch = false;
  countdownBtn.classList.add("active");
  stopwatchBtn.classList.remove("active");
  stopwatchDisplay.style.display = "none";
  countdownDisplay.style.display = "block";
  countdownInputs.style.display = "flex";
}

console.log(Math.min(Math.max(333, 0), 55));
