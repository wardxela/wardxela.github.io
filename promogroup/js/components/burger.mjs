export function burgerToggle() {
  document.querySelector('.burger').addEventListener('click', () => {
    document.querySelector('.footer').classList.toggle('footer_active');
    document;
    document.querySelector('.header').classList.toggle('header_active');
  });
}
