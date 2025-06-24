const checkInputbtn = document.querySelector("#checkBtn");
const resetInputbtn = document.querySelector("#resetBtn");
const input = document.querySelector("#textInput");
const result = document.querySelector("#result");
const themeBtn = document.querySelector("#toggleThemeBtn");
input.value = "";

function checkPalindrome() {
  const value = input.value.toLowerCase().replace(/[\W_]/g, "");
  const reversed = value.split("").reverse().join("");

  if (!value) {
    input.style.border = "2px solid #ffcc00";
    result.textContent = "Please enter a value!";
    result.style.color = "#ffcc00";
    return;
  } else {
    input.style.border = "none";
  }

  if (value === reversed) {
    result.textContent = "✅ Yes! It's a palindrome.";
    result.style.color = getComputedStyle(document.body)
      .getPropertyValue("--success-color")
      .trim();
  } else {
    result.textContent = "❌ Nope! Not a palindrome.";
    result.style.color = getComputedStyle(document.body)
      .getPropertyValue("--error-color")
      .trim();
  }
}
function changeTheme() {
  const darkModeEnabled = document.body.classList.toggle("light-mode");
  themeBtn.textContent = darkModeEnabled
    ? "Change to Dark theme"
    : "Change to Light theme";
}

function resetFunction() {
  input.value = "";
  result.textContent = "";
}

themeBtn.addEventListener("click", changeTheme);
checkInputbtn.addEventListener("click", checkPalindrome);
resetInputbtn.addEventListener("click", resetFunction);
input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    checkPalindrome();
  }
});
