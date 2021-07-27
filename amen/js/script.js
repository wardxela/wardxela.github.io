const burger = document.querySelector(".header__burger");
const headerMenu = document.querySelector(".header-menu");
const heroIcons = document.querySelector(".hero-icons");
const slider = document.querySelector(".blog-slider__container");
const leftBtn = document.querySelector("[data-slider-left]");
const rightBtn = document.querySelector("[data-slider-right]");

burger.addEventListener("click", e => {
  burger.classList.toggle("_active");
  headerMenu.classList.toggle("_opened");
  // document.body.style.overflow =
});

headerMenu.addEventListener("click", e => {
  if (!e.target.closest(".header-menu__nav")) {
    headerMenu.classList.remove("_opened");
    burger.classList.remove("_active");
  }
});

let wholeSliderOffset = 0;
let slideOffset = document.querySelector(".slide").offsetWidth + 70;
const sliderLength = document.querySelectorAll(".slide").length;

leftBtn.addEventListener("click", e => {
  if (!leftBtn.disabled) {
    wholeSliderOffset += slideOffset * +leftBtn.dataset.sliderLeft;
    moveSlider(wholeSliderOffset);
    setStateOfBtns();
  }
});

rightBtn.addEventListener("click", e => {
  if (!rightBtn.disabled) {
    wholeSliderOffset += slideOffset * +rightBtn.dataset.sliderRight;
    moveSlider(wholeSliderOffset);
    setStateOfBtns();
  }
});

window.addEventListener("scroll", e => {
  heroIcons.style.bottom = -81 + window.pageYOffset / 4 + "px";
});

function moveSlider(offset) {
  slider.style.transform = `translateX(${offset}px)`;
}

function setStateOfBtns() {
  if (wholeSliderOffset < 0) {
    leftBtn.disabled = false;
  } else {
    leftBtn.disabled = true;
  }
  if (wholeSliderOffset === -slideOffset * (sliderLength - 1)) {
    rightBtn.disabled = true;
  } else {
    rightBtn.disabled = false;
  }
}
