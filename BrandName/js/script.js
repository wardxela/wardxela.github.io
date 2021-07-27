const menu = document.querySelector(".header-menu");
const video = document.querySelector("#video-about-us");
const input = document.querySelector("#email-input");
const inputPlaceholder = document.querySelector(".footer-form__placeholder");

document.addEventListener("click", e => {
  if (e.target.closest(".burger")) {
    if (menu.classList.contains("_opened")) {
      menu.style.height = "auto";
      setTimeout(() => {
        menu.style.height = null;
      }, 300);
    }
    menu.classList.toggle("_opened");
  }
  if (e.target.closest(".about__video-control")) {
    // e.target.closest('.about__video-control')
    video.play();
    video.closest(".about__video").classList.add("_watching");
    video.setAttribute("controls", true);
  }
});

input.onfocus = e => {
  inputPlaceholder.classList.add("focused");
};
input.onblur = e => {
  if (!input.value) {
    inputPlaceholder.classList.remove("focused");
  }
};
