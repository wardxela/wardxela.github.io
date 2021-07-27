const menu = document.querySelector(".main-menu");
const burger = document.querySelector(".burger");
const accordions = document.querySelectorAll(".accordion");
const animationItems = document.querySelectorAll("._effect");

function addEffect(e) {
  animationItems.forEach(item => {
    const itemCoords = item.getBoundingClientRect().top + item.offsetHeight / 2;
    if (itemCoords <= document.documentElement.clientHeight) {
      item.classList.add("_animate");
    }
  });
}

function closeElements(items) {
  items.forEach(item => {
    item.classList.remove("_opened");
    item.lastElementChild.style.maxHeight = 0 + "px";
  });
}

document.addEventListener("click", e => {
  const el = e.target;
  if (el.closest(".burger")) {
    burger.classList.toggle("active");
    menu.classList.toggle("opened");
  } else if (!el.closest(".main-menu__container")) {
    menu.classList.remove("opened");
    burger.classList.remove("active");
  }

  if (el.closest(".accordion")) {
    const currentAccordion = el.closest(".accordion");
    if (el.classList.contains("accordion__toggler")) {
      if (currentAccordion.classList.contains("_opened")) {
        currentAccordion.lastElementChild.style.maxHeight = 0 + "px";
        currentAccordion.classList.remove("_opened");
      } else {
        closeElements(accordions);
        const accordionBody = currentAccordion.lastElementChild;
        accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
        currentAccordion.classList.add("_opened");
      }
    }
  } else {
    closeElements(accordions);
  }
});

window.addEventListener("scroll", addEffect);
addEffect();
