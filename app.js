const imageCard = document.querySelector(".image_card");
const slideCard = document.querySelector(".slide_card");
const resizeBar = document.querySelector(".resize_bar");
const imageAppearance = document.getElementById("image_appearance");
const image1 = document.getElementById("image_1");
const image2 = document.getElementById("image_2");
const imageSelect = document.getElementById("image");
const output = document.querySelector(".output");

let isResizing = false;
const filterNames = [
  { id: 0, name: "blur", value: "10", sign: "px" },
  { id: 1, name: "brightness", value: "200", sign: "%" },
  { id: 2, name: "contrast", value: "200", sign: "%" },
  { id: 3, name: "drop-shadow", value: "8px 8px 10px gray", sign: "px" },
  { id: 4, name: "grayscale", value: "100", sign: "%" },
  { id: 5, name: "hue-rotate", value: "90deg", sign: "deg" },
  { id: 6, name: "invert", value: "100", sign: "%" },
  { id: 7, name: "saturate", value: "8", sign: "" },
  { id: 8, name: "sepia", value: "200", sign: "%" },
];

imageSelect.addEventListener("change", (e) => {
  const image = URL.createObjectURL(e.target.files[0]);
  if (image) {
    image1.src = image;
    image2.src = image;
  }
  return;
});

filterNames.forEach((filter) => {
  const option = document.createElement("option");
  option.value = filter.id;
  option.textContent = filter.name;
  imageAppearance.appendChild(option);
});
imageAppearance.addEventListener("change", (e) => {
  const value = parseInt(e.target.value);
  if (e.target.value === "none") {
    resizeBar.style.visibility = "hidden";
    slideCard.style.filter = "none";
    return;
  }
  if (value === 3 || value === 5) {
    resizeBar.style.visibility = "visible";
    const findVal = filterNames.find((f) => f.id === value);
    console.log(`${findVal.name}(${findVal.value})`);
    slideCard.style.filter = `${findVal.name}(${findVal.value})`;
    return;
  }
  resizeBar.style.visibility = "visible";
  const findVal = filterNames.find((f) => f.id === value);
  slideCard.style.filter = `${findVal.name}(${findVal.value}${findVal.sign})`;
});
resizeBar.addEventListener("mousedown", (e) => {
  isResizing = true;
  document.body.style.cursor = "ew-resize";
});

resizeBar.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  const rect = imageCard.getBoundingClientRect();
  let newWidth = e.clientX - rect.left;

  newWidth = Math.max(0, Math.min(newWidth, rect.width));

  slideCard.style.clipPath = `inset( 0 ${rect.width - newWidth}px 0 0)`;
  resizeBar.style.left = `${newWidth}px`;
  output.textContent = `${newWidth}`;
});

resizeBar.addEventListener("mouseup", (e) => {
  isResizing = false;
  document.body.style.cursor = "default";
});

resizeBar.addEventListener("mouseleave", (e) => {
  isResizing = false;
  document.body.style.cursor = "default";
});
