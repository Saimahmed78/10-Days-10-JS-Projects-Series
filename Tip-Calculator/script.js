// get all inputs
const billAmountInput = document.querySelector("#billAmount");
const tipPercentageInput = document.querySelector("#tipPercentage");
const totalPersonInput = document.querySelector("#totalPerson");
const allInputs = document.querySelectorAll("input");

//get all output displays
const tipAmountDisplay = document.querySelector("#totalTip");
const tipPerPersonDisplay = document.querySelector("#tipPerPerson");

//get all action buttons
const calculateBtn = document.querySelector("#calculateBtn");
const discountBtns = document.querySelectorAll(".tip-btn");
const themeBtn = document.querySelector("#toggleThemeBtn");
const resetBtn = document.querySelector("#resetBtn");
let isLightMode;

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

// Event listeners
calculateBtn.addEventListener("click", calculateTip);

discountBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    discount(btn);
  }),
);
allInputs.forEach((input) =>
  input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") calculateTip();
  }),
);
themeBtn.addEventListener("click", manageLocalStorage);
resetBtn.addEventListener("click", reset);

// All Utility functions
function manageLocalStorage() {
  isLightMode = document.body.classList.toggle("light-mode");
  isLightMode
    ? localStorage.setItem("theme", "light")
    : localStorage.setItem("theme", "dark");
  changeTheme(isLightMode);
}
function changeTheme(isLightMode) {
  themeBtn.textContent = !isLightMode ? "Dark-Mode" : "Light-Mode";
  themeBtn.prepend(isLightMode ? icons.sun() : icons.moon());
}
function calculateTip() {
  let bill = parseFloat(billAmountInput.value);
  let tipPercentage = parseFloat(tipPercentageInput.value);
  let totalPerson = parseInt(totalPersonInput.value);

  if (
    Number.isNaN(bill) ||
    Number.isNaN(tipPercentage) ||
    Number.isNaN(totalPerson) ||
    totalPerson === 0
  ) {
    showAlert("Please ensure all values are valid");
    reset();
    return;
  }

  let totaltip = (tipPercentage * bill) / 100;
  let tipPerPerson = totaltip / totalPerson;

  tipAmountDisplay.textContent = `$${totaltip.toFixed(2)}`;
  tipPerPersonDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
}
function discount(btn) {
  let discount = btn.dataset.action;
  tipPercentageInput.value = discount;
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
function reset() {
  allInputs.forEach((input) => (input.value = 0));
  tipAmountDisplay.textContent = "0.00";
  tipPerPersonDisplay.textContent = "0.00";
}
function showAlert(message) {
  const alertBox = document.getElementById("alertBox");
  alertBox.textContent = message;
  // alertBox.classList.remove("hidden");
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
    // alertBox.classList.add("hidden");
  }, 2500); // Toast lasts 2.5 seconds
}


// Call functions automatically on first load
changeThemeFirst();
reset();
