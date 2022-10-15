const headerInfoMenu = document.querySelector("[data-info-menu]");

const searchInput = document.querySelector("#search-input");

const headerMainMenu = document.querySelector(".header-bottom-menu__wrapper");

const catalogMenu = document.querySelector(".catalog-menu-outer");
const catalogHandler = document.querySelector("[data-catalog-handler]");
const catalogLists = document.querySelectorAll("[data-nesting-level]");

const productPreviewPopUp = document.querySelector("[data-product-pop-up]");

document.addEventListener("click", e => {
  if (e.target.closest(["[data-info-btn]"])) {
    headerInfoMenu.classList.toggle("_opened");
  } else if (!e.target.closest("[data-info-menu]")) {
    headerInfoMenu.classList.remove("_opened");
  }

  if (e.target.closest("[data-open-main-menu]")) {
    headerMainMenu.classList.add("_opened");
    bodyStateToggler(true);
  } else if (
    (!e.target.closest(".header-bottom-menu") &&
      headerMainMenu.classList.contains("_opened") &&
      !catalogMenu.classList.contains("_opened")) ||
    e.target.closest("[data-close-main-menu]")
  ) {
    headerMainMenu.classList.remove("_opened");
    bodyStateToggler(false);
  }

  if (
    !e.target.closest(".catalog-menu-inner") &&
    !e.target.closest("[data-catalog-handler]")
  ) {
    closeCatalogList();
    catalogMenu.classList.remove("_opened");
  }

  if (e.target.closest("[data-carousel-btn]")) {
    const btn = e.target.closest("[data-carousel-btn]");
    carouselHandler(
      btn.dataset.correspondingCarousel,
      +btn.dataset.carouselBtn
    );
  }

  if (e.target.closest("[data-carousel-nav-index]")) {
    const carouselNavBtn = e.target.closest("[data-carousel-nav-index]");
    carouselHandler(
      carouselNavBtn.parentElement.dataset.correspondingCarousel,
      +carouselNavBtn.dataset.carouselNavIndex,
      false
    );
  }

  if (e.target.closest("[data-quick-preview")) {
    fillProductData(
      e.target.closest("[data-product-json]").dataset.productJson
    );
    productPreviewPopUp.classList.add("_opened");
    bodyStateToggler(true);
  } else if (e.target.closest("[data-close-product-preview")) {
    productPreviewPopUp.classList.remove("_opened");
    bodyStateToggler(false);
  }

  if (e.target.closest("[data-scroll-to-top]")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (e.target.closest("[data-accordion-handler]")) {
    const btn = e.target.closest("[data-accordion-handler]");

    accordionHandler(btn);
  }

  if (e.target.closest("[data-show-more-filters]")) {
    const btn = e.target.closest("[data-show-more-filters]");
    btn.previousElementSibling.style.height = "100%";
    btn.remove();
  }

  if (e.target.closest("[data-show-advanced-filters]")) {
    document.querySelector("[data-advanced-filters]").classList.add("_active");
  } else if (e.target.closest("[data-hide-advanced-filters]")) {
    document
      .querySelector("[data-advanced-filters]")
      .classList.remove("_active");
  }

  if (e.target.closest("[data-input-password-controller]")) {
    const inputId = e.target.closest("[data-input-password-controller]").dataset
      .inputPasswordController;
    const input = document.querySelector(`#${inputId}`);
    input.type = input.type === "password" ? "text" : "password";
  }
});

catalogHandler.addEventListener("click", e => {
  catalogMenu.classList.contains("_opened") && closeCatalogList();
  catalogMenu.classList.toggle("_opened");
});

catalogMenu.addEventListener("click", e => {
  if (e.target.closest("[data-open-sub-catalog]")) {
    const subList = e.target.closest(".catalog-menu__item");
    setCatalogState(subList);
  } else if (e.target.closest("[data-back-to-prev-catalog")) {
    const lvl = parseInt(
      e.target.closest("[data-nesting-level]").dataset.nestingLevel
    );
    transformCatalogList(lvl - 1);
  }
});

searchInput.addEventListener("blur", e => {
  if (searchInput.value) {
    searchInput.nextElementSibling.classList.add("_focused");
  } else {
    searchInput.nextElementSibling.classList.remove("_focused");
  }
});

document.querySelectorAll("[data-carousel-current-slide]").forEach(carousel => {
  const nav = document.querySelector(
    `[data-carousel-nav][data-corresponding-carousel="${carousel.id}"]`
  );

  if (nav) {
    createCarouselNav(nav, calcSlidesCount(carousel));
  }
});

document.querySelectorAll("[data-accordion-handler]").forEach(btn => {
  if (btn.classList.contains("_opened")) {
    const list = document.querySelector(`#${btn.dataset.accordionHandler}`);
    console.log(list);
    list.style.height = `auto`;
  }
});

function createCarouselNav(nav, slidesCount) {
  while (nav.firstElementChild) {
    nav.removeChild(nav.firstElementChild);
  }
  for (let i = 0; i < slidesCount; i++) {
    const btn = document.createElement("button");
    btn.classList.add("carousel-nav-item");
    btn.dataset.carouselNavIndex = i + 1;
    if (i === 0) {
      btn.classList.add("carousel-nav-item_active");
    }
    nav.append(btn);
  }
}

function setCatalogState(list) {
  const nestingLevel = parseInt(list.dataset.nestingLevel);
  catalogLists.forEach(el => {
    if (parseInt(el.dataset.nestingLevel) >= nestingLevel) {
      el.classList.remove("_opened");
    }
  });
  list.classList.add("_opened");
  transformCatalogList(nestingLevel);
}

function transformCatalogList(lvl) {
  if (document.documentElement.clientWidth < 1380) {
    document.querySelector(".catalog-menu").style.transform = `translateX(-${
      100 * lvl
    }%)`;
  }
}

function closeCatalogList() {
  catalogLists.forEach(el => el.classList.remove("_opened"));
  transformCatalogList(0);
}

function carouselHandler(carouselId, index, isBtn = true) {
  const carousel = document.querySelector(`#${carouselId}`);
  const slidesCount = calcSlidesCount(carousel);

  const leftBtn = document.querySelector(
    `[data-corresponding-carousel="${carouselId}"][data-carousel-btn="-1"]`
  );
  const rightBtn = document.querySelector(
    `[data-corresponding-carousel="${carouselId}"][data-carousel-btn="1"]`
  );

  let next = isBtn ? +carousel.dataset.carouselCurrentSlide + index : index;

  if (next > slidesCount) {
    next = 1;
  } else if (next < 1) {
    next = slidesCount;
  }
  setStateOfCarouselNav(carouselId, next);
  carousel.style.transform = `translateX(-${100 * (next - 1)}%)`;
  carousel.dataset.carouselCurrentSlide = next;
}

function calcSlidesCount(el) {
  return el.childElementCount === 0
    ? 0
    : Math.ceil(
        (el.childElementCount * el.firstElementChild.offsetWidth) /
          el.offsetWidth
      );
}

function setStateOfCarouselNav(carouselId, next) {
  const nav = document.querySelector(
    `[data-carousel-nav][data-corresponding-carousel="${carouselId}"]`
  );
  if (nav) {
    for (let btn of nav.children) {
      if (+btn.dataset.carouselNavIndex === next) {
        btn.classList.add("carousel-nav-item_active");
      } else if (btn.classList.contains("carousel-nav-item_active")) {
        btn.classList.remove("carousel-nav-item_active");
      }
    }
  }
}

function bodyStateToggler(stuck) {
  document.body.style.overflow = stuck ? "hidden" : null;
}

function fillProductData(data) {
  const product = productPreviewPopUp;
  const slider = product.querySelector("#product-preview-images");

  data = JSON.parse(data);

  product.querySelector("[data-product-preview-title]").textContent =
    data.title;
  product.querySelector("[data-product-preview-reviews-count]").textContent =
    data.reviewsCount;
  product.querySelector("[data-product-preview-code]").textContent = data.code;
  product.querySelector("[data-product-preview-count]").textContent =
    data.inStock;
  product.querySelector("[data-product-preview-price]").textContent =
    data.price;
  product.querySelector("[data-product-preview-description]").textContent =
    data.description;

  let starIndex = 0;
  for (let star of product.querySelector("[data-product-preview-stars]")
    .children) {
    if (starIndex++ < data.stars) {
      star.classList.add("_active");
    } else {
      star.classList.remove("_active");
    }
  }

  while (slider.firstElementChild) {
    slider.removeChild(slider.firstElementChild);
  }

  data.images.forEach(src => {
    const wrapper = document.createElement("div");
    const img = document.createElement("img");
    wrapper.className = "img-wrapper product-preview-slider__img";
    img.src = src;
    wrapper.append(img);
    slider.append(wrapper);
  });
  createCarouselNav(
    document.querySelector(
      '[data-carousel-nav][data-corresponding-carousel="product-preview-images"]'
    ),
    calcSlidesCount(slider)
  );
  carouselHandler(slider.id, 1, false);
}

function accordionHandler(btn) {
  btn.classList.toggle("_opened");
  const list = document.querySelector(`#${btn.dataset.accordionHandler}`);

  if (+list.dataset.accordionOpened) {
    list.style.height = 0;
    list.dataset.accordionOpened = 0;
  } else {
    list.style.height = `${list.scrollHeight}px`;
    list.dataset.accordionOpened = 1;
  }
}
