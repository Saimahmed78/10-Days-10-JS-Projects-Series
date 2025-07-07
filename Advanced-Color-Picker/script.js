let colorPickerInput = document.querySelector("#color-picker");
let selectedColorDisplay = document.querySelector("#selected-hex");
let copyButton = document.querySelector("#copy-hex");
let compBox = document.querySelector("#complementary-box");
let compColorDisplay = document.querySelector("#complementary-hex");
let favColorDisplay = document.querySelector("#favorites-section");
let favouriteColorBtn = document.querySelector("#favourite-color");
let delFavouritesBtn = document.querySelector("#delFavorites");
let count = 0;


colorPickerInput.addEventListener("input", () => {
  let selectedColor = colorPickerInput.value;
  showSelectedColor(selectedColor);
  showCompColor(selectedColor);
});

copyButton.addEventListener("click", copyToClipBoard);
favouriteColorBtn.addEventListener("click", addFavouriteColor);
delFavouritesBtn.addEventListener("click", delFavourites);

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
      alert("Clipboard access denied. Try HTTPS or click manually.");
    });
}

// create function to insert li in favourite div ul
function addFavouriteColor() {
  count++;
  const favColorId = crypto.randomUUID();
  const [primaryColor, compColor] = getColors();
  const primarycolorDiv = createPrimaryColor(primaryColor);
  const compColorDiv = createCompColor(compColor);
  const countElement = createColorNumber(count);
  const liElement = addColorElementstoLi(
    countElement,
    primarycolorDiv,
    compColorDiv,
  );
  liElement.setAttribute("data-id", favColorId);
  liElement.classList.add("favorites-list", "colorList");
  savetoLocalStorage(primaryColor, compColor, favColorId);
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

  primaryColorHex.classList.add("color-hex", "color-number");
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

  compColorHex.classList.add("color-hex", "color-number");
  compColorHex.innerText = compColor;
  compColorButton.classList.add("copy-btn");
  compColorBox.classList.add("color-swatch");
  compColorBox.style.backgroundColor = compColor;
  compColorButton.innerText = "Button";
  compColorDiv.append(compColorHex, compColorBox, compColorButton);

  return compColorDiv;
}

function createColorNumber(count) {
  const p = document.createElement("p");
  p.innerText = count;
  return p;
}

// create function to append both color divs in li elements
function addColorElementstoLi(countElement, primarycolorDiv, compColorDiv) {
  const li = document.createElement("li");
  const colorPairdiv = document.createElement("div");

  const delBtn = addDltbtn();
  li.classList.add("favorites-list,colorList");
  colorPairdiv.classList.add("color-pair");
  colorPairdiv.append(countElement, primarycolorDiv, compColorDiv);
  li.append(colorPairdiv, delBtn);
  delBtn.addEventListener("click", () => {
    delFavourite(delBtn);
  });

  return li;
}

// Save Favourites colors to Storage
function savetoLocalStorage(primaryColor, compColor, favColorId) {
  const stored = JSON.parse(localStorage.getItem("li") || "[]");

  stored.push({
    primary: primaryColor,
    complementary: compColor,
    Id: favColorId,
  });

  localStorage.setItem("li", JSON.stringify(stored));
}

// Render Favourites color on Load
function renderFavouritesOnFirstLoad() {
  const storedFavouritesArr = JSON.parse(localStorage.getItem("li") || "[]");

  storedFavouritesArr.forEach((favColor, index) => {
    const primarycolorDiv = createPrimaryColor(favColor.primary);
    const compColorDiv = createCompColor(favColor.complementary);
    const liElement = addColorElementstoLi(primarycolorDiv, compColorDiv);
    liElement.setAttribute("data-id", favColor.id);
    favColorDisplay.classList.add("favorites-section");
    favColorDisplay.append(liElement);
  });
}

function addDltbtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Del Color";
  deleteBtn.classList.add("copy-btn");
  return deleteBtn;
}

function delFavourites() {
  localStorage.removeItem("li");
  location.reload();
}

function delFavourite(delBtn) {
  const elementToDelete = delBtn.parentElement;
  const Id = elementToDelete.dataset.id;
  elementToDelete.remove();
  delFavouriteFromlocalStorage(Id);
}

function delFavouriteFromlocalStorage(Id) {
  const storedFavouritesArr = JSON.parse(localStorage.getItem("li") || "[]");
  let updatedArr = storedFavouritesArr.filter((el) => el.Id !== Id);
  localStorage.setItem("li", JSON.stringify(updatedArr));
}

renderFavouritesOnFirstLoad();
