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

    ProductItem.querySelector(".product-info-img .product-img img").src = item.images;
    ProductItem.querySelector(".product-info-img .product-title h2").innerHTML = item.title;
    // ProductItem.querySelector(".product-info-img .product-id").innerHTML = item.id;
    ProductItem.querySelector(".product-info-img .product-price").innerHTML = `R$: ${item.price.toFixed(2)}`;
    ProductItem.querySelector(".product--item--qtarea .product--item--qt").innerHTML = qtd;
    ProductItem.querySelector(".product-options .product-item-qtavailable").innerHTML = `${item.amount} Disponíveis`;
    ProductItem.querySelector(".product--item--qtarea .product--item-qtmenos").addEventListener("click", () => {
        qtd = ProductItem.querySelector(".product--item--qtarea .product--item--qt").innerHTML
        if (qtd > 1) {
            qtd--;
            ProductItem.querySelector(".product--item--qtarea .product--item--qt").innerHTML = qtd;
            price = item.price;
            priceTotal = price * qtd;
            ProductItem.querySelector(".product-info-img .product-price").innerHTML = `R$: ${priceTotal.toFixed(2)}`;
        }
    });

    ProductItem.querySelector(".product--item--qtarea .product--item-qtmais").addEventListener("click", () => {
        qtd = ProductItem.querySelector(".product--item--qtarea .product--item--qt").innerHTML
        if (qtd < item.amount) {
            qtd++;
            ProductItem.querySelector(
                ".product--item--qtarea .product--item--qt"
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

    // MOBILE MOBILE MOBILE
    if (screenWidth < 850) {
        ProductItem.addEventListener("click", () => {
            qtd = 1;
            cc(".windowdetails").style.opacity = 0;
            cc(".windowdetails").style.display = "flex";
            setTimeout(() => {
                cc(".windowdetails").style.opacity = 1;
                cc("#body-modal").style.overflow = "hidden";
                cc(".product-modal .product-item-qtavailable").innerHTML = item.amount
                cc(".product-modal .product-img #img").src = item.images;
                cc(".product-modal .product-title h2").innerHTML = item.title;
                cc(".product-modal .product--item--qt").innerHTML = qtd;
                price = item.price
                cc(".product-modal .product-price").innerHTML = `R$: ${ item.price.toFixed(2) }`;
            }, 200);

            // excluir product do carrinho
            cc(".product-modal .product-trash").addEventListener("click", () => {
                cc(".product").style.opacity = 1;

                setTimeout(() => {
                    cc(".product").style.opacity = 0;
                    cc(".product").style.display = "none";
                }, 200);
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            });
        });
    }

});

// altera quantidade MOBILE (falta mexer ainda)



cc(".product-modal .product--item-qtmenos").addEventListener("click", () => {

    if (qtd > 1) {
        qtd--;
        cc(".product-modal .product--item--qt").innerHTML = qtd;
        priceTotal = price * qtd;
        cc(".product-modal .product-price").innerHTML = `R$: ${priceTotal.toFixed(2)}`;
        cc(".product-info-img .align-price-qtd .qtd").innerHTML = `QTD: ${qtd}`

    }
});
cc(".product-modal .product--item-qtmais").addEventListener("click", () => {

    const amount = cc(".product-modal .product-item-qtavailable").innerText
    if (qtd < amount) {
        qtd++;
        cc(".product-modal .product--item--qt").innerHTML = qtd;
        priceTotal = price * qtd;
        cc(".product-modal .product-price").innerHTML = `R$: ${priceTotal.toFixed(2)}`;
        cc(".align-price-qtd .qtd").innerHTML = `QTD: ${qtd}`


    }
});





// close modal product cart
const modal = cc(".product-modal");
cc(".windowdetails").addEventListener("click", function(e) {
    if (!modal.contains(e.target)) {
        cc(".windowdetails").style.opacity = 0;
        qtd = 1;

        setTimeout(() => {
            cc(".windowdetails").style.display = "none";
            cc("#body-modal").style.overflow = "initial";

            cc(".product-modal .product--item--qt").innerHTML = qtd;
        }, 200);
    }
});

// comprar
cc('#purchase-pay').addEventListener('click', () => {
        cc(".windowpurchase").style.opacity = 0;
        cc(".windowpurchase").style.display = "flex";
        setTimeout(() => {
            cc(".windowdetails").style.opacity = 0;
            cc(".windowdetails").style.display = "none";
            cc(".windowpurchase").style.opacity = 1;
        }, 200);
    })
    //close modal comprar
const purchaseModal = cc(".purchase-modal");
cc(".windowpurchase").addEventListener("click", function(e) {
    if (!purchaseModal.contains(e.target)) {
        cc(".windowpurchase").style.opacity = 0;
        document.getElementById("price_freight").innerText = `Frete de todos os produtos: 00`;
        document.getElementById("date_freight").innerText = `Prazo de entrega de 0 dias`;
        setTimeout(() => {
            cc(".windowpurchase").style.display = "none";
        }, 200);
    }
});
