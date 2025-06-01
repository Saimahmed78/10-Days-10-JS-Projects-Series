console.log("🔥 script.js loaded");
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const btn = document.getElementById("timeBtn");
const themeBtn = document.getElementById("toggleThemeBtn");

let is24hour = false;
let lastGreeting = "";
let userOverriddenTheme = false;
let intervalId = null;
function updateDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = now.toLocaleDateString(undefined, options);
  dateElement.innerText = date;
}
function updateTime() {
  const now = new Date();
  const hours = is24hour
    ? now.getHours().toString().padStart(2, "0")
    : (now.getHours() % 12 || 12).toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const amPm = is24hour ? "" : now.getHours() < 12 ? "AM" : "PM";
  timeElement.innerText = `${hours}:${minutes}:${seconds} ${amPm}`;
  updateGreeting();
  updateTheme();
}

function startClock() {
  clearInterval(intervalId);
  intervalId = setInterval(updateTime, 1000);
  updateTime();
}
function updateTheme() {
  const now = new Date();
  const hours = now.getHours();

  // Only enforce theme at EXACT 6AM or 7PM
  if (
    (hours === 6 || hours === 19) &&
    now.getMinutes() === 0 &&
    now.getSeconds() === 0
  ) {
    userOverriddenTheme = false; // reset manual override
  }

  if (userOverriddenTheme) return; // 🛑 Respect user override between auto switches

  if (hours >= 19 || hours < 6) {
    document.body.classList.remove("light-mode"); // 🌙 Night mode
  } else {
    document.body.classList.add("light-mode"); // ☀️ Day mode
  }
}

function updateGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greeting = "Hello";

  if (hours < 12) greeting = "☀️ Good Morning!";
  else if (hours < 17) greeting = "🌤️ Good Afternoon!";
  else if (hours < 21) greeting = "🌙 Good Evening!";
  else {
    greeting = "Good Night";
  }

  if (greeting !== lastGreeting) {
    const greetingElement = document.getElementById("greeting");
    greetingElement.innerText = greeting;
    lastGreeting = greeting;
  }
}

btn.addEventListener("click", () => {
  is24hour = !is24hour;
  btn.innerText = is24hour ? "Switch to 12 hour" : "Switch to 24 hour";
  startClock();
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  userOverriddenTheme = true; // 🔓 Manual override flag set
});

updateGreeting();
intervalId = setInterval(updateTime, 1000);
updateTime();
updateDate();
updateTheme();
