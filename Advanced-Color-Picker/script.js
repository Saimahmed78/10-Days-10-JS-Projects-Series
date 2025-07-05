let colorPickerInput = document.querySelector("#color-picker");
let selectedColorDisplay = document.querySelector("#selected-hex");
let copyButton = document.querySelector("#copy-selected");
let compBox = document.querySelector("#complementary-box");
let compColorDisplay = document.querySelector("#complementary-hex");
let favColorDisplay = document.querySelector("#favorite-box");

colorPickerInput.addEventListener("input", () => {
  let selectedColor = colorPickerInput.value;
  showSelectedColor(selectedColor);
  showCompColor(selectedColor);
});

copyButton.addEventListener("click", copyToClipBoard);

function showSelectedColor(color) {
  selectedColorDisplay.textContent = color;
  selectedColorDisplay.style.color = color;
}

function showCompColor(selectedColor) {
  const compColor = calculateCompColor(selectedColor);
  compColorDisplay.textContent = compColor;
  compBox.style.backgroundColor = compColor;
}

function calculateCompColor(color) {
  const intColor = parseInt(color.slice(1), 16);
  const comp = 0xffffff ^ intColor;
  return "#" + comp.toString(16).padStart(6, "0");
}

function copyToClipBoard() {
  const color = selectedColorDisplay.textContent;
  navigator.clipboard
    .writeText(color)
    .then(() => {
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy to ClipBoard";
      }, 2500);
    })
    .catch((err) => {
      console.error("Clipboard read failed:", err);
      alert("Clipboard access denied. Try HTTPS or click manually.");
    });
}
