const cc = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const baseurl = "https://ecomerceoutlet.herokuapp.com";
let Index;
let qtd = 1;
let price;
let priceTotal;

let screenWidth = screen.width;
let cart = JSON.parse(localStorage.getItem("cart"));
cart.map((item, index) => {
  let ProductItem = cc(".models .product").cloneNode(true);

  ProductItem.querySelector(".product-info-img .product-img img").src =
    item.images;
  ProductItem.querySelector(".product-info-img .product-title h2").innerHTML =
    item.title;
  ProductItem.querySelector(
    ".product-info-img .product-price"
  ).innerHTML = `R$: ${item.price.toFixed(2)}`;
  ProductItem.querySelector(
    ".product--item--qtarea .product--item--qt"
  ).innerHTML = qtd;
  if (item.amount == 1) {
    ProductItem.querySelector(
      ".product-options .product-item-qtavailable"
    ).innerHTML = `${item.amount} Disponível`;
  } else {
    ProductItem.querySelector(
      ".product-options .product-item-qtavailable"
    ).innerHTML = `${item.amount} Disponíveis`;
  }

  ProductItem.querySelector(
    ".product-options > .product--item--qtarea > .product--item-qtmenos"
  ).addEventListener("click", () => {
    qtd = ProductItem.querySelector(
      ".product-options > .product--item--qtarea > .product--item--qt"
    ).innerHTML;
    if (qtd > 1) {
      qtd--;
      ProductItem.querySelector(
        ".product-options > .product--item--qtarea > .product--item--qt"
      ).innerHTML = qtd;
      price = item.price;
      priceTotal = price * qtd;
      ProductItem.querySelector(
        ".product-info-img .product-price"
      ).innerHTML = `R$: ${priceTotal.toFixed(2)}`;
    }
  });

  ProductItem.querySelector(
    ".product-options > .product--item--qtarea > .product--item-qtmais"
  ).addEventListener("click", () => {
    qtd = ProductItem.querySelector(
      ".product-options > .product--item--qtarea > .product--item--qt"
    ).innerHTML;
    if (qtd < item.amount) {
      qtd++;
      ProductItem.querySelector(
        ".product-options > .product--item--qtarea > .product--item--qt"
      ).innerHTML = qtd;
      price = item.price;
      priceTotal = price * qtd;
      ProductItem.querySelector(
        ".product-info-img .product-price"
      ).innerHTML = `R$: ${priceTotal.toFixed(2)}`;
    }
  });

  // excluir product do carrinho
  ProductItem.querySelector(".product-options .product-trash").addEventListener(
    "click",
    () => {
      Index = index;
      removeCart(Index);
    }
  );

  cc(".section-cart").append(ProductItem);
}); // end map

function removeCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// comprar
cc("#purchase-pay").addEventListener("click", () => {
  cc(".windowpurchase").style.opacity = 0;
  cc(".windowpurchase").style.display = "flex";
  setTimeout(() => {
    cc(".windowdetails").style.opacity = 0;
    cc(".windowdetails").style.display = "none";
    cc(".windowpurchase").style.opacity = 1;
  }, 200);
});
//close modal comprar
const purchaseModal = cc(".purchase-modal");
cc(".windowpurchase").addEventListener("click", function (e) {
  if (!purchaseModal.contains(e.target)) {
    cc(".windowpurchase").style.opacity = 0;
    document.getElementById(
      "price_freight"
    ).innerText = `Frete de todos os produtos: 00`;
    document.getElementById(
      "date_freight"
    ).innerText = `Prazo de entrega de 0 dias`;
    setTimeout(() => {
      cc(".windowpurchase").style.display = "none";
    }, 200);
  }
});
// excluir product do carrinho
cc("#clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  location.reload();
});
