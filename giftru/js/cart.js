const cartItems = document.querySelectorAll("[data-cart-element]");

cartItems.forEach(item => {
  cartStateHandler("__INIT__", item);
  item.addEventListener("click", e => {
    if (e.target.closest("[data-cart-action]")) {
      const btn = e.target.closest("[data-cart-action]");
      cartStateHandler(btn.dataset.cartAction, item);
    } else if (e.target.closest("[data-cart-remove-item]")) {
      cartStateHandler("remove", item);
      e.target.closest("[data-cart-element]").remove();
    }
  });
});

function cartStateHandler(action, parentItem) {
  const itemAmountEl = parentItem.querySelector("[data-cart-item-amount]");
  const itemPriceEl = parentItem.querySelector("[data-cart-item-price]");

  switch (action) {
    case "increment":
      cartItemStateHandler(itemAmountEl, itemPriceEl, 1);
      break;
    case "decrement":
      cartItemStateHandler(itemAmountEl, itemPriceEl, -1);
      break;
    case "remove":
      cartItemStateHandler(itemAmountEl, itemPriceEl, null, true);
      break;
    case "__INIT__":
      cartItemStateHandler(itemAmountEl, itemPriceEl);
      break;
  }

  cartTotalStateHandler();
}

function cartItemStateHandler(
  itemAmountEl,
  itemPriceEl,
  value = 0,
  removing = false
) {
  const updatedAmount = removing
    ? 0
    : parseInt(itemAmountEl.textContent) + value;

  if (updatedAmount > 0 || removing) {
    itemAmountEl.textContent = updatedAmount;
    itemPriceEl.textContent =
      updatedAmount * parseInt(itemPriceEl.dataset.cartItemPrice);
  }
}

function cartTotalStateHandler() {
  const cartTotalEl = document.querySelector("[data-cart-total]");
  let cartTotalPrice = 0;
  cartItems.forEach(item => {
    cartTotalPrice += parseInt(
      item.querySelector("[data-cart-item-price").textContent
    );
  });
  cartTotalEl.textContent = cartTotalPrice;
}
