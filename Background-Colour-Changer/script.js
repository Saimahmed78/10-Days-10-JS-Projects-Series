let btn = document.querySelector("#change-btn");
let container = document.querySelector("#color-box");
let rgbDisplay = document.querySelector("#rgb-code");
let countDisplay = document.querySelector("#change-count");
let colorHistory = document.querySelector("#color-history");
let resetBtn = document.querySelector("#reset-btn");

let changeColorCount;
let colorHistoryObj;
let storedValue = localStorage.getItem("changeColorCount");

btn.addEventListener("click", changecolor);
window.addEventListener("load", onreload);
resetBtn.addEventListener("click", resetLocalStorage);

function onreload() {
  let currentColor = localStorage.getItem("Currentcolor");
  changeColorCount = localStorage.getItem("changeColorCount");
  let colorHistoryobject = localStorage.getItem("colorHistory")
    ? JSON.parse(localStorage.getItem("colorHistory"))
    : {};
  Object.entries(colorHistoryobject).map((color) => {
    let colorarray = color;
    let colorCount = colorarray[0];
    let rgbCode = colorarray[1];
    const li = document.createElement("li");
    li.innerText = ` ${colorCount}  =  ${rgbCode}`;
    colorHistory.appendChild(li);
  });
  countDisplay.textContent = changeColorCount;
  rgbDisplay.textContent = currentColor;
  container.style.backgroundColor = currentColor;
}

function resetLocalStorage() {
  localStorage.clear();
}

function changecolor() {
  let storedCount = localStorage.getItem("changeColorCount");
  changeColorCount = storedCount !== null ? parseInt(storedCount) + 1 : 1;

  let R = Math.floor(Math.random() * 256);
  let G = Math.floor(Math.random() * 256);
  let B = Math.floor(Math.random() * 256);

  let currentColor = `rgb(${R},${G},${B})`;
  rgbDisplay.textContent = `rgb(${R},${G},${B})`;
  countDisplay.textContent = changeColorCount;
  localStorage.setItem("changeColorCount", changeColorCount);
  localStorage.setItem("Currentcolor", currentColor);
  container.style.backgroundColor = `rgb(${R},${G},${B})`;
  addcolorHistory(currentColor, changeColorCount);
}
function addcolorHistory(currentColor, changeColorCount) {
  const li = document.createElement("li");
  let storedHistory = localStorage.getItem("colorHistory");
  colorHistoryObj = storedHistory ? JSON.parse(storedHistory) : {};
  colorHistoryObj[changeColorCount] = currentColor;

  li.innerText = ` ${changeColorCount}  = ${currentColor}`;
  localStorage.setItem("colorHistory", JSON.stringify(colorHistoryObj));
  colorHistory.appendChild(li);
}
