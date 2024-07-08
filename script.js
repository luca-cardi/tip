const donationInput = document.getElementById("donation");
const tipAmountSpan = document.getElementById("tip-amount");
const tipSlider = document.getElementById("tip-slider");
const totalSpan = document.getElementById("total");
const customTipInput = document.getElementById("custom-tip");
const tooltip = document.getElementById("tooltip");
const tooltipText = document.querySelector(".tooltip-text");

const percentages = [0, 0.05, 0.1, 0.15, 0.2];
const faces = ["😐", "😊", "😁", "😃", "😍"];

function updateTipAmount() {
  const donationAmount = parseFloat(donationInput.value);
  const percentage = percentages[tipSlider.value];
  const tipAmount = donationAmount * percentage;
  tipAmountSpan.textContent = `£${tipAmount.toFixed(2)}`;
  totalSpan.textContent = `£${(donationAmount + tipAmount).toFixed(2)}`;
  updateTooltip();
  updateSliderBackground();
}

function updateCustomTipAmount() {
  
  const donationAmount = parseFloat(donationInput.value);
  const customTipAmount = parseFloat(customTipInput.value) || 0;
  tipAmountSpan.textContent = `£${customTipAmount.toFixed(2)}`;
  totalSpan.textContent = `£${(donationAmount + customTipAmount).toFixed(2)}`;
}

function updateTooltip() {
  
  const percentage = percentages[tipSlider.value] * 100;
  const face = faces[tipSlider.value];
  tooltipText.textContent = `${face} ${percentage}% (£${customTipInput.value})`;
  const sliderWidth = tipSlider.offsetWidth;
  const sliderMax = tipSlider.max;
  const value = tipSlider.value;

  
  let left = (value / sliderMax) * sliderWidth;
  if (value == 0) {
    left += 15
  } else if (value == 1) {
    left += 7
  } else if (value == 3) {
    left -= 7
  } else if (value == 4) { 
    left -= 15
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.display = "block";
}

function updateSliderBackground() {
  const value =
    ((tipSlider.value - tipSlider.min) / (tipSlider.max - tipSlider.min)) * 100;
  tipSlider.style.background = `linear-gradient(to right, darkgreen ${value}%, lightgreen ${value}%)`;
  tipSlider.style.backgroundSize = "100% 100%";
}

donationInput.addEventListener("input", updateTipAmount);
tipSlider.addEventListener("input", updateTipAmount);
customTipInput.addEventListener("input", updateCustomTipAmount);
tipSlider.addEventListener("input", updateTooltip);
tipSlider.addEventListener("input", updateSliderBackground);

updateTipAmount();
updateSliderBackground();
