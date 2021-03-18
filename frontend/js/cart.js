const cc = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const baseurl = "https://ecomerceoutlet.herokuapp.com";
const tokenUser = localStorage.getItem("Authorization");
const zip_code = localStorage.getItem("Zip_code");
let Index;
let quantity = 1;
let prazoEntrega = 0;
let priceItem = 0;
let price = 0;
let PricetotalPagarme = 0;
let IndexUpdate;
let priceTotal = 0;
let subtotal = 0;
let value;
let screenWidth = screen.width;
let cart = JSON.parse(localStorage.getItem("cart"));
cart.map((item, index) => {
  let ProductItem = cc(".models .product").cloneNode(true);
  subtotal += item.price * item.quantity;
  ProductItem.querySelector(".product-info-img .product-img img").src =
    item.images;
  ProductItem.querySelector(".product-info-img .product-title h2").innerHTML =
    item.title;
  const priceTotalQuantity = item.price * item.quantity;
  const formatReal = priceTotalQuantity.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });
  ProductItem.querySelector(
    ".product-info-img .product-price"
  ).innerHTML = `R$: ${formatReal}`;
  ProductItem.querySelector(
    ".product--item--qtarea .product--item--qt"
  ).innerHTML = item.quantity;
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
    quantity = ProductItem.querySelector(
      ".product-options > .product--item--qtarea > .product--item--qt"
    ).innerHTML;

    if (quantity > 1) {
      quantity--;
      ProductItem.querySelector(
        ".product-options > .product--item--qtarea > .product--item--qt"
      ).innerHTML = quantity;
      price = item.price;
      priceTotal = price * quantity;
      const formatReal = priceTotal.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
      ProductItem.querySelector(
        ".product-info-img .product-price"
      ).innerHTML = `R$: ${formatReal}`;

      // update quantity of purchase

      const ProductCart = cart.find((el) => {
        if (el.id === item.id) {
          IndexUpdate = cart.indexOf(item);

          return item;
        } else {
          return null;
        }
      });

      if (ProductCart) {
        ProductCart.quantity = quantity;

        cart.splice(IndexUpdate, 1);

        cart.push({
          id: ProductCart.id,
          images: ProductCart.images,
          title: ProductCart.title,
          price: ProductCart.price,
          amount: ProductCart.amount,
          weight: ProductCart.weight,
          lenght: ProductCart.lenght,
          width: ProductCart.width,
          height: ProductCart.height,
          cm3: ProductCart.cm3,
          quantity: ProductCart.quantity,
          attributes: ProductCart.attributes,
        });
        localStorage.setItem("cart", JSON.stringify(cart));

        subtotal -= price;
      }
    }
  });

  ProductItem.querySelector(
    ".product-options > .product--item--qtarea > .product--item-qtmais"
  ).addEventListener("click", () => {
    quantity = ProductItem.querySelector(
      ".product-options > .product--item--qtarea > .product--item--qt"
    ).innerHTML;

    if (quantity < item.amount) {
      quantity++;
      ProductItem.querySelector(
        ".product-options > .product--item--qtarea > .product--item--qt"
      ).innerHTML = quantity;
      price = item.price;
      priceTotal = price * quantity;
      const formatReal = priceTotal.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
      ProductItem.querySelector(
        ".product-info-img .product-price"
      ).innerHTML = `R$: ${formatReal}`;
    }
    // update quantity of purchase

    const ProductCart = cart.find((el) => {
      if (el.id === item.id) {
        IndexUpdate = cart.indexOf(item);

        return item;
      } else {
        return null;
      }
    });

    if (ProductCart) {
      ProductCart.quantity = quantity;

      cart.splice(IndexUpdate, 1);

      cart.push({
        id: ProductCart.id,
        images: ProductCart.images,
        title: ProductCart.title,
        price: ProductCart.price,
        amount: ProductCart.amount,
        weight: ProductCart.weight,
        lenght: ProductCart.lenght,
        width: ProductCart.width,
        height: ProductCart.height,
        cm3: ProductCart.cm3,
        quantity: ProductCart.quantity,
        attributes: ProductCart.attributes,
      });
      localStorage.setItem("cart", JSON.stringify(cart));

      subtotal += price;
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
  // preenche os dados
  const formatReal = subtotal.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });
  document.getElementById("subtotal").innerText = `Subtotal: R$: ${formatReal}`;
  // PEGAR TODOS OS PRODUTOS E A QUANTIDADE DE CADA PRODUTO

  const productsPurchase = JSON.parse(localStorage.getItem("cart"));
  let weightFreight = 0;
  let weightProduct;
  let totalHeight;
  productsPurchase.map((item) => {
    if (item.quantity != 1) {
      const qtd = Number(item.quantity);
      weightProduct = item.cm3 * qtd;
      totalHeight = item.height * qtd;
    } else {
      weightProduct = item.cm3;
      totalHeight = item.height;
    }
    weightFreight += weightProduct;
  });

  // verifica se existe mais de um produto no carrinho
  if (productsPurchase.length > 1) {
    // http://sooho.com.br/2017/03/27/calcular-as-dimensoes-de-caixas-dos-correios-sedexpac/
    let width = 0;
    let height = 0;
    let length = 0;
    let newLength = 0;
    let newWidth = 0;
    let newHeight = 0;
    productsPurchase.map((item) => {
      if (width < item.width) width = item.width;
      if (height < totalHeight) height = totalHeight;
      if (length < item.lenght) length = item.lenght;
    });

    // a maior dimensão se torna comprimento
    if (width > height && width > length) {
      newLength = width;
    } else if (height > width && height > length) {
      newLength = height;
    } else if (length > width && length > height) {
      newLength = length;
    }
    // a menor se torna largura
    if (width < height && width < length) {
      newWidth = width;
    } else if (height < width && height < length) {
      newWidth = height;
    } else if (length < height && length < width) {
      newWidth = length;
    }
    // a dimensão intermediaria se torna altura
    if (
      (width > height && width < length) ||
      (width < height && width > length)
    ) {
      newHeight = width;
    } else if (
      (height < width && height > length) ||
      (height > width && height < length)
    ) {
      newHeight = height;
    } else if (
      (length < height && length > width) ||
      (length > height && length < width)
    ) {
      newHeight = length;
    }

    newHeight = newHeight < 1 ? 1 : newHeight;
    newWidth = newWidth < 10 ? 10 : newWidth;
    newLength = newLength < 15 ? 15 : newLength;

    CalcFreight(
      weightFreight.toFixed(2),
      newWidth,
      newHeight,
      newLength,
      zip_code
    );
  } else {
    CalcFreight(
      weightFreight,
      productsPurchase[0].width,
      totalHeight,
      productsPurchase[0].lenght,
      zip_code
    );
  }

  setTimeout(() => {
    cc(".windowdetails").style.opacity = 0;
    cc(".windowdetails").style.display = "none";
    cc(".windowpurchase").style.opacity = 1;
  }, 200);
});

async function CalcFreight(weight, width, height, lenght, zip_code) {
  let Freight = {
    weight,
    zip_code,
    lenght,
    width,
    height,
    methodFreight: "PAC",
  };
  console.log(Freight);

  const DataFreight = await fetch(`${baseurl}/freight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    body: JSON.stringify(Freight),
  });
  const DataFreightJson = await DataFreight.json();
  if (DataFreightJson.Valor == "0,00") {
    console.log(DataFreightJson.MsgErro);
    alert(
      "erro encontrado, por favor entre em contato com a loja pelo telefone (67) 98104-4548, para outras opções de frete"
    );
  } else {
    document.getElementById(
      "price_freight"
    ).innerHTML = `Frete dos produtos: R$: ${DataFreightJson.Valor}`;
    document.getElementById(
      "date_freight"
    ).innerHTML = `Prazo de entrega de ${DataFreightJson.PrazoEntrega} dias`;
    prazoEntrega = DataFreightJson.PrazoEntrega;
    value = parseFloat(DataFreightJson.Valor);
    PricetotalPagarme = value + subtotal;
    const formatReal = PricetotalPagarme.toLocaleString("pt-br", {
      minimumFractionDigits: 2,
    });
    cc(".total").innerHTML = `<span>Total: </span>R$ ${formatReal}`;
    const SelectInstallments = document.getElementById("installments");
    // parcelamento

    for (let index = 1; index <= 6; index++) {
      let price = PricetotalPagarme;
      price = (price / index).toFixed(2);
      var el = document.createElement("option");

      el.textContent = `${index} x de ${price}`;
      el.value = index;
      SelectInstallments.appendChild(el);
    }
    if (PricetotalPagarme >= 50.0) {
      for (let index = 7; index <= 12; index++) {
        // colocar juros
        let price = PricetotalPagarme;
        price = (price / index).toFixed(2);
        var el = document.createElement("option");
        el.textContent = `${index} x de ${price}`;
        el.value = index;
        SelectInstallments.appendChild(el);
      }
    }
  }
}

//close modal comprar
const purchaseModal = cc(".purchase-modal");
const SelectInstallments = document.getElementById("installments");

cc(".windowpurchase").addEventListener("click", function (e) {
  if (!purchaseModal.contains(e.target)) {
    cc(".windowpurchase").style.opacity = 0;
    var i,
      L = SelectInstallments.options.length - 1;
    for (i = L; i >= 0; i--) {
      SelectInstallments.remove(i);
    }
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
