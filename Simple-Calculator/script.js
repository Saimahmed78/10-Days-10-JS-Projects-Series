let btns = document.querySelectorAll(".btn");
let display = document.querySelector("#display");
let isFirstInput = true;
let is2ndInput = false;
let firstInput = "";
let isDotFirstInput = 0;
let isDotSecondInput = 0;
let SecondInput = "";
let operator;
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.action === "=") {
      if (SecondInput.length === 0) {
        showAlert("Please Enter 2nd Input");
        return;
      }
      console.log("all is ok");
      let res = calc(operator, firstInput, SecondInput);
      display.textContent = res;
      firstInput = "";
      SecondInput = "";
      is2ndInput = false;
      isFirstInput = true;
      isDotFirstInput = 0;
      isDotSecondInput = 0;
    } else if (btn.dataset.action === "clear") {
      firstInput = "";
      SecondInput = "";
      operator = null;
      isFirstInput = true;
      display.textContent = 0;
    } else if (isFirstInput) {
      let input = btn.dataset.action;
      let Selected = parseInt(btn.dataset.action);
      console.log(input);
      if (input === ".") {
        if (isDotFirstInput >= 1) {
          showAlert("You cannot enter . more than one time");
          return;
        } else {
          isDotFirstInput++;
        }
      }
      if (
        isNaN(Selected) &&
        firstInput.length == 0 &&
        input != "-" &&
        input != "."
      ) {
        showAlert("Please Select a Number");
      } else if (isNaN(Selected) && firstInput.length >= 1 && input != ".") {
        getop(btn);
        isFirstInput = false;
      } else if (
        !isNaN(Selected) ||
        (firstInput.length == 0 && input == "-") ||
        input == "."
      ) {
        getfirstinput(input);
      }
    } else if (is2ndInput) {
      let input = btn.dataset.action;

      let Selected = parseInt(btn.dataset.action);
      if (
        !isNaN(Selected) ||
        (btn.dataset.action != "=" &&
          SecondInput.length == 0 &&
          btn.dataset.action == "-") ||
        btn.dataset.action == "."
      ) {
        if (input === ".") {
          if (isDotSecondInput >= 1) {
            showAlert("You cannot enter . more than one time");
            return;
          } else {
            isDotSecondInput++;
          }
        }

        getSecondinput(input, btn);
      } else if (isNaN(Selected)) {
        if (btn.dataset.action != "=" && isNaN(Selected)) {
          isDotSecondInput=0
          firstInput = calc(operator, firstInput, SecondInput);
          SecondInput = "";
          isFirstInput = false;
          is2ndInput = false;

          getop(btn);
        }
      }
    }
  });
});

function getfirstinput(Selected) {
  firstInput += Selected;
  display.textContent = firstInput;
}
function getop(btn) {
  operator = btn.dataset.action;
  let Selected = parseInt(btn.dataset.action);
  if (!isNaN(Selected)) {
    showAlert("Please Select a Operation");
    return;
  }
  is2ndInput = true;
}
function getSecondinput(Selected, btn) {
  if (!isFirstInput) {
    SecondInput += Selected;
    display.textContent = SecondInput;
  } else {
    SecondInput = btn.dataset.action;
    display.textContent = btn.dataset.action;
  }
  isFirstInput = false;
 
  return;
}

function calc(op, num1, num2) {
  let a = Number(num1);
  let b = Number(num2);
  let result; // declare it properly
  switch (op) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
    default:
      return; // exit early if invalid op
  }
  return result; // return the final value
}

function showAlert(message) {
  const alertBox = document.getElementById("alertBox");
  alertBox.textContent = message;
  alertBox.classList.remove("hidden");
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
    alertBox.classList.add("hidden");
  }, 2500); // Toast lasts 2.5 seconds
}

