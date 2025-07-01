let textarea = document.querySelector("#input");
let charCountDisplay = document.querySelector("#charCount");
let wordCountDisplay = document.querySelector("#wordsCount");
let sentenceCountDisplay = document.querySelector("#sentenceCount");
let longestWordDisplay = document.querySelector("#longestWord");
let averageqWordlengthDisplay = document.querySelector("#avgLength");
let alphabetsCountDisplay = document.querySelector("#alphabetsCount");
let themeBtn = document.querySelector("#toggleThemeBtn");
let anlyzeBtn = document.querySelector("#analyzeText");
let resetBtn = document.querySelector("#reset");
let isLightMode;
let sentenceCount = 0;
let totalWords = 0;
let textareaInput = textarea.value.trim();
textarea.value = "";

// get templates to display icons
const icons = {
  sun: () =>
    document
      .querySelector("#sun-icon-template")
      .content.firstElementChild.cloneNode(true),
  moon: () =>
    document
      .querySelector("#moon-icon-template")
      .content.firstElementChild.cloneNode(true),
};

function countcharacter() {
  let charCount = this.value.length;
  charCountDisplay.textContent = charCount;
  if (charCount == 500) {
    showAlert("You have reached the free limit ");
  }
}

function analyzeText() {
  textareaInput = textarea.value.trim();
  let stringArr = textareaInput.split(/\s+/);
  let stringLengthArr = stringArr.map((word) => word.length);
  let largestString =
    stringArr[stringLengthArr.indexOf(Math.max(...stringLengthArr))];
  let wordCount = stringArr.filter(Boolean).length;
  let totalAphabets = stringLengthArr.reduce((acc, curr) => acc + curr, 0);
  wordCountDisplay.textContent = wordCount;
  sentenceCountDisplay.textContent = sentenceCount;
  longestWordDisplay.textContent = largestString;
  averageqWordlengthDisplay.textContent = (totalAphabets / wordCount).toFixed(
    0,
  );
  alphabetsCountDisplay.textContent = totalAphabets;
}
function changeTheme(isLightMode) {
  themeBtn.textContent = !isLightMode ? "Dark-Mode" : "Light-Mode";
  themeBtn.prepend(isLightMode ? icons.sun() : icons.moon());
}
function changeThemeFirst() {
  if (localStorage.getItem("theme") == "dark") {
    document.body.classList.remove("light-mode");
    isLightMode = false;
    changeTheme(isLightMode);
  } else {
    document.body.classList.add("light-mode");
    isLightMode = true;
    changeTheme(isLightMode);
  }
}

function manageLocalStorage() {
  isLightMode = document.body.classList.toggle("light-mode");
  isLightMode
    ? localStorage.setItem("theme", "light")
    : localStorage.setItem("theme", "dark");
  changeTheme(isLightMode);
}

function resetUI() {
  textarea.value = "";
  charCountDisplay.textContent =
    wordCountDisplay.textContent =
    sentenceCountDisplay.textContent =
    longestWordDisplay.textContent =
    averageqWordlengthDisplay.textContent =
    alphabetsCountDisplay.textContent =
      0;
}

function showAlert(message) {
  const alertBox = document.getElementById("alertBox");
  alertBox.textContent = message;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 2500); // Toast lasts 2.5 seconds
}

themeBtn.addEventListener("click", manageLocalStorage);
textarea.addEventListener("input", countcharacter.bind(textarea));
textarea.addEventListener("keypress", (event) => {
  if (event.key == ".") {
    sentenceCount = textareaInput.split(".").filter(Boolean).length;
  }
});
resetBtn.addEventListener("click", resetUI);
anlyzeBtn.addEventListener("click", analyzeText);
changeThemeFirst();
