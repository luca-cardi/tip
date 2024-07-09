const donationInput = document.getElementById("donation");
const tipAmountSpan = document.getElementById("tip-amount");
const tipSlider = document.getElementById("tip-slider");
const totalSpan = document.getElementById("total");
const tooltip = document.getElementById("tooltip");
const tooltipText = document.querySelector(".tooltip-text");

const percentages = [0, 0.05, 0.1, 0.15, 0.2];
const faces = ["😐", "😊", "😁", "😃", "😍"];
const emoticons = ["👎", "👍", "👏", "🙌", "🎉"];

let tipAmountString;

function updateTipAmount() {
  const donationAmount = parseFloat(donationInput.value || 0);
  const percentage = percentages[tipSlider.value];
  const tipAmount = donationAmount * percentage;
  tipAmountSpan.textContent = `£${tipAmount.toFixed(2)}`;
  tipAmountString = tipAmount.toFixed(2);

  totalSpan.textContent = `£${(donationAmount + tipAmount).toFixed(2)}`;
  updateTooltip();
  updateSliderBackground();
  updateBreakpoints();
  
}

function updateTooltip() {
  const percentage = percentages[tipSlider.value] * 100;
  const emoticon = emoticons[tipSlider.value];
  tooltipText.textContent = `${emoticon} ${percentage}% (£${tipAmountString})`;
  tooltip.style.color = "#374151";
  const sliderWidth = tipSlider.offsetWidth;
  const sliderMax = tipSlider.max;
  const value = tipSlider.value;

  let left = (value / sliderMax) * sliderWidth;
  if (value == 0) {
    left += 15;
  } else if (value == 1) {
    left += 7;
  } else if (value == 3) {
    left -= 7;
  } else if (value == 4) {
    left -= 15;
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

function updateBreakpoints() {
  const percentage =
    ((tipSlider.value - tipSlider.min) / (tipSlider.max - tipSlider.min)) * 100;

  const breakpoints = document.querySelectorAll(".breakpoint");
  breakpoints.forEach((bp) => (bp.style.background = "darkgreen"));

  if (percentage > 25) {
    document.querySelector(".bp-25").style.background = "white";
  }
  if (percentage > 50) {
    document.querySelector(".bp-50").style.background = "white";
  }
  if (percentage > 75) {
    document.querySelector(".bp-75").style.background = "white";
  }
}

donationInput.addEventListener("input", updateTipAmount);
tipSlider.addEventListener("input", updateTipAmount);
tipSlider.addEventListener("input", updateTooltip);
tipSlider.addEventListener("input", updateSliderBackground);

updateTipAmount();
updateSliderBackground();
updateBreakpoints();
