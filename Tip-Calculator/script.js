let billAmountInput = document.querySelector("#billAmount");
let tipPercentageInput = document.querySelector("#tipPercentage");
let totalPersonInput = document.querySelector("#totalPerson");
let tipAmountDisplay = document.querySelector("#totalTip");
let tipPerPersonDisplay = document.querySelector("#tipPerPerson");
let calculateBtn = document.querySelector("#calculateBtn");
let discountBtns = document.querySelectorAll(".tip-btn");
const themeBtn = document.getElementById("toggleThemeBtn");

billAmountInput.value = 0;
tipPercentageInput.value = 0;
totalPersonInput.value = 0;

calculateBtn.addEventListener("click", calculateTip);
discountBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    console.log("btn is clicked");
    discount(btn);
  }),
);
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  userOverriddenTheme = true; // 🔓 Manual override flag set
});

function calculateTip() {
  let bill = parseFloat(billAmountInput.value);
  let tipPercentage = parseFloat(tipPercentageInput.value);
  let totalPerson = parseInt(totalPersonInput.value);

  if (
    Number.isNaN(bill) ||
    Number.isNaN(tipPercentage) ||
    Number.isNaN(totalPerson)
  ) {
    alert("Please ensure all values are Numbers");
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
