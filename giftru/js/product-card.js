document.querySelectorAll("[data-self-review-count]").forEach(diagram => {
  diagram.style.width = `${
    (diagram.dataset.selfReviewCount / diagram.dataset.allReviewCount) * 100
  }%`;
});
