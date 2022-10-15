import { burgerToggle } from './components/burger.mjs';
burgerToggle();

function transformCarousel(carousel, position) {
  carousel.style.transform = `translateX(-${position * 100}%)`;
}

function addActive(element) {
  element.classList.add('projects-nav__link_active');
}

const links = document.querySelectorAll('.projects-nav__link');
const carousel = document.querySelector('.projects-main__carousel');
const location = document.location.href.substr(-1, 1);
let pos;

/[1-4]/.test(location) ? (pos = location - 1) : (pos = 0);

transformCarousel(carousel, pos);
addActive(links[pos]);
links.forEach(value => {
  value.addEventListener('click', e => {
    e.preventDefault();
    links[pos].classList.remove('projects-nav__link_active');
    pos = e.target.dataset.pos - 1;
    transformCarousel(carousel, pos);
    addActive(links[pos]);
  });
});
