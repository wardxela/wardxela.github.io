const menu = document.querySelector('.header__menu');
const burger = document.querySelector('.burger');

burger.addEventListener('click', e => {
  menu.classList.toggle('header__menu__active');
});
