let colorPickerInput = document.querySelector("#color-picker");
let selectedColorDisplay = document.querySelector("#selected-hex");
let copyButton = document.querySelector("#copy-selected");
let compBox = document.querySelector("#complementary-box");
let compColorDisplay = document.querySelector("#complementary-hex");
let favColorDisplay = document.querySelector("#favorites-section");
let favouriteColorBtn = document.querySelector("#favourite-color");

colorPickerInput.addEventListener("input", () => {
  let selectedColor = colorPickerInput.value;
  showSelectedColor(selectedColor);
  showCompColor(selectedColor);
});

copyButton.addEventListener("click", copyToClipBoard);
favouriteColorBtn.addEventListener("click", addFavouriteColor);

console.log(favouriteColorBtn);
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

// create function to insert li in favourite div ul
function addFavouriteColor() {
  const [primaryColor, compColor] = getColors();
  const primarycolorDiv = createPrimaryColor(primaryColor);
  const compColorDiv = createCompColor(compColor);
  const liElement = addColorElementstoLi(primarycolorDiv, compColorDiv);

  favColorDisplay.classList.add("favorites-section");
  favColorDisplay.append(liElement);
}

// create function to get both colors
function getColors() {
  const primaryColor = selectedColorDisplay.textContent;
  const compColor = compColorDisplay.textContent;
  return [primaryColor, compColor];
}

// create function to create primary color complete div including hexcode, colordiv, button
function createPrimaryColor(primaryColor) {
  const primarycolorDiv = document.createElement("div");
  const primaryColorHex = document.createElement("p");
  const primaryColorButton = document.createElement("button");
  const primaryColorBox = document.createElement("div");
  primaryColorHex.classList.add("color-hex");
  primaryColorHex.innerText = primaryColor;
  primaryColorButton.classList.add("copy-btn");
  primaryColorButton.innerText = "Button";
  primaryColorBox.classList.add("color-swatch");
  primaryColorBox.style.backgroundColor = primaryColor;
  primarycolorDiv.append(primaryColorHex, primaryColorBox, primaryColorButton);

  return primarycolorDiv;
}

// create function to create comp color complete div including hexcode, colordiv, button
function createCompColor(compColor) {
  const compColorDiv = document.createElement("div");
  const compColorBox = document.createElement("div");
  const compColorHex = document.createElement("p");
  const compColorButton = document.createElement("button");

  compColorHex.classList.add("color-hex");
  compColorHex.innerText = compColor;
  compColorButton.classList.add("copy-btn");
  compColorBox.classList.add("color-swatch");
  compColorBox.style.backgroundColor = compColor;
  compColorButton.innerText = "Button";
  compColorDiv.append(compColorHex, compColorBox, compColorButton);

  return compColorDiv;
}

// create function to append both color divs in li elements
function addColorElementstoLi(primarycolorDiv, compColorDiv) {
  const li = document.createElement("li");
  const colorPairdiv = document.createElement("div");

  li.classList.add("favorites-list");
  colorPairdiv.classList.add("color-pair");

  colorPairdiv.append(primarycolorDiv, compColorDiv);
  li.append(colorPairdiv);

  return li;
}
