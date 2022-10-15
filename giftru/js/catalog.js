const leftAgeController = document.querySelector("[data-range-age-left]");
const rightAgeController = document.querySelector("[data-range-age-right]");
const activeAgeLine = document.querySelector("[data-range-age-line]");
const fromAge = document.querySelector("[data-age-from]");
const toAge = document.querySelector("[data-age-to]");

const leftPriceController = document.querySelector("[data-range-price-left]");
const rightPriceController = document.querySelector("[data-range-price-right]");
const activePriceLine = document.querySelector("[data-range-price-line]");
const fromPrice = document.querySelector("[data-price-from]");
const toPrice = document.querySelector("[data-price-to]");

// Age inputs
leftAgeController.addEventListener("input", e => {
  if (+leftAgeController.value > +rightAgeController.value) {
    leftAgeController.value = rightAgeController.value;
  }

  fromAge.value = leftAgeController.value;

  changeActiveLine(
    activeAgeLine,
    leftAgeController.min,
    leftAgeController.max,
    leftAgeController.value,
    rightAgeController.value
  );
});

rightAgeController.addEventListener("input", e => {
  if (+rightAgeController.value < +leftAgeController.value) {
    rightAgeController.value = leftAgeController.value;
  }

  toAge.value = rightAgeController.value;

  changeActiveLine(
    activeAgeLine,
    leftAgeController.min,
    leftAgeController.max,
    leftAgeController.value,
    rightAgeController.value
  );
});

fromAge.addEventListener("input", e => {
  if (+fromAge.value > +toAge.value) {
    fromAge.value = toAge.value;
  }
  leftAgeController.value = fromAge.value;
  changeActiveLine(
    activeAgeLine,
    leftAgeController.min,
    leftAgeController.max,
    leftAgeController.value,
    rightAgeController.value
  );
});

toAge.addEventListener("input", e => {
  if (+toAge.value < +fromAge.value) {
    toAge.value = fromAge.value;
  }

  rightAgeController.value = toAge.value;

  changeActiveLine(
    activeAgeLine,
    leftAgeController.min,
    leftAgeController.max,
    leftAgeController.value,
    rightAgeController.value
  );
});

// Price inputs

leftPriceController.addEventListener("input", e => {
  if (+leftPriceController.value > +rightPriceController.value) {
    leftPriceController.value = rightPriceController.value;
  }

  fromPrice.value = leftPriceController.value;

  changeActiveLine(
    activePriceLine,
    leftPriceController.min,
    leftPriceController.max,
    leftPriceController.value,
    rightPriceController.value
  );
});

rightPriceController.addEventListener("input", e => {
  if (+rightPriceController.value < +leftPriceController.value) {
    rightPriceController.value = leftPriceController.value;
  }

  toPrice.value = rightPriceController.value;

  changeActiveLine(
    activePriceLine,
    leftPriceController.min,
    leftPriceController.max,
    leftPriceController.value,
    rightPriceController.value
  );
});

fromPrice.addEventListener("input", e => {
  if (+fromPrice.value > +toPrice.value) {
    fromPrice.value = toPrice.value;
  }
  leftPriceController.value = fromPrice.value;
  changeActiveLine(
    activePriceLine,
    leftPriceController.min,
    leftPriceController.max,
    leftPriceController.value,
    rightPriceController.value
  );
});

toPrice.addEventListener("input", e => {
  if (+toPrice.value < +fromPrice.value) {
    toPrice.value = fromPrice.value;
  }

  rightPriceController.value = toPrice.value;

  changeActiveLine(
    activePriceLine,
    leftPriceController.min,
    leftPriceController.max,
    leftPriceController.value,
    rightPriceController.value
  );
});

changeActiveLine(
  activeAgeLine,
  leftAgeController.min,
  leftAgeController.max,
  leftAgeController.value,
  rightAgeController.value
);

changeActiveLine(
  activePriceLine,
  leftPriceController.min,
  leftPriceController.max,
  leftPriceController.value,
  rightPriceController.value
);

function changeActiveLine(line, min, max, leftVal, rightVal) {
  line.style.left = `${((leftVal - min) / max) * 100}%`;
  line.style.right = `${((max - rightVal) / max) * 100}%`;
}
