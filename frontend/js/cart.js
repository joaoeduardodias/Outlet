const cc = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
const baseurl = "https://ecomerceoutlet.herokuapp.com";
let Index;
let qtd = 1;
let idProduct;
let price;
let priceTotal;
let attribute_one;
let attribute_two;
let screenWidth = screen.width;
let cart = JSON.parse(localStorage.getItem("cart"));
cart.map((item, index) => {
    let ProductItem = cc(".models .product").cloneNode(true);

    ProductItem.querySelector(".product-info-img .product-img img").src =
        item.images;
    ProductItem.querySelector(".product-info-img .product-title h2").innerHTML =
        item.title;
    ProductItem.querySelector(".product-info-img .product-id").innerHTML =
        item.id;

    ProductItem.querySelector(
        ".product-info-img .product-price"
    ).innerHTML = `R$: ${item.price.toFixed(2)}`;
    ProductItem.querySelector(
        ".product--item--qtarea .product--item--qt"
    ).innerHTML = qtd;
    ProductItem.querySelector(
        ".product-options .product-item-qtavailable"
    ).innerHTML = `${item.amount} Disponíveis`;
    ProductItem.querySelector(
        ".product--item--qtarea .product--item-qtmenos"
    ).addEventListener("click", () => {
        if (qtd > 1) {
            qtd--;
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

    ProductItem.querySelector(
        ".product--item--qtarea .product--item-qtmais"
    ).addEventListener("click", () => {
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
    //comprar
    ProductItem.querySelector(".product-purchase").addEventListener(
        "click",
        async() => {
            Index = index;
            idProduct = item.id;
            attribute_one = item.attributes.value01
            attribute_two = item.attributes.value02
            setPriceFreight();

            cc(".windowpurchase").style.opacity = 0;
            cc(".windowpurchase").style.display = "flex";
            setTimeout(() => {
                cc(".windowdetails").style.opacity = 0;
                cc(".windowdetails").style.display = "none";
                cc(".windowpurchase").style.opacity = 1;
                cc(".purchase-modal .product-title h2").innerHTML = item.title;
                price = item.price;
                priceTotal = price * qtd;
                cc(".purchase-modal .product-price").innerHTML = `R$: ${priceTotal.toFixed(2)}`;
                cc(".purchase-modal .product--item--qt").innerHTML = `Quantidade: ${qtd}`;
                cc(".purchase-modal .product-attributes .value01").innerHTML = `Tamanho: ${item.attributes.value01}`
                cc(".purchase-modal .product-attributes .value02").innerHTML = `Cor: ${item.attributes.value02}`

                cc(".product-details .product-img img").src = item.images;
            }, 200);
            // close modal
            const modal = cc(".purchase-modal");
            cc(".windowpurchase").addEventListener("click", function(e) {
                if (!modal.contains(e.target)) {
                    cc(".windowpurchase").style.opacity = 0;
                    qtd = 1;
                    ProductItem.querySelector(".product--item--qtarea .product--item--qt").innerHTML = qtd;
                    document.getElementById("price_freight").innerText = `Frete: 00`;
                    document.getElementById("date_freight").innerText = `Prazo de entrega de 0 dias`;
                    setTimeout(() => {
                        cc(".windowpurchase").style.display = "none";
                    }, 200);
                }
            });
        }
    );

    cc(".section-cart").append(ProductItem);

    if (screenWidth < 850) {
        ProductItem.addEventListener("click", () => {
            cc(".windowdetails").style.opacity = 0;
            cc(".windowdetails").style.display = "flex";
            setTimeout(() => {
                cc(".windowdetails").style.opacity = 1;
                cc("#body-modal").style.overflow = "hidden";

                cc(".product-modal .product-img #img").src = item.images;
                cc(".product-modal .product-title h2").innerHTML = item.title;

                cc(".product-modal .product-price").innerHTML = `R$: ${ item.price.toFixed(2) }`;
            }, 200);
            cc(".product-modal .product--item-qtmenos").addEventListener(
                "click",
                () => {
                    if (qtd > 1) {
                        qtd--;
                        cc(".product-modal .product--item--qt").innerHTML = qtd;
                        price = item.price;
                        priceTotal = price * qtd;
                        cc(
                            ".product-modal .product-price"
                        ).innerHTML = `
                                    R$: $ { priceTotal.toFixed(2) }
                                    `;
                    }
                }
            );
            cc(".product-modal .product--item-qtmais").addEventListener(
                "click",
                () => {
                    if (qtd < item.amount) {
                        qtd++;
                        cc(".product-modal .product--item--qt").innerHTML = qtd;
                        price = item.price;
                        priceTotal = price * qtd;
                        cc(
                            ".product-modal .product-price"
                        ).innerHTML = `
                                    R$: $ { priceTotal.toFixed(2) }
                                    `;
                    }
                }
            );
            // comprar
            cc(".product-modal .product-purchase").addEventListener("click", () => {
                Index = index;
                idProduct = item.id;


                setPriceFreight();

                cc(".windowpurchase").style.opacity = 0;
                cc(".windowpurchase").style.display = "flex";
                setTimeout(() => {
                    cc(".windowdetails").style.opacity = 0;
                    cc(".windowdetails").style.display = "none";
                    cc(".windowpurchase").style.opacity = 1;
                    cc(".purchase-modal .product-title h2").innerHTML = item.title;
                    cc(".purchase-modal .product-attributes .value01").innerHTML = `Tamanho: ${item.attributes.value01}`
                    cc(".purchase-modal .product-attributes .value02").innerHTML = `Cor: ${item.attributes.value02}`

                    price = item.price;
                    priceTotal = price * qtd;
                    cc(".purchase-modal .product-price").innerHTML = `R$: ${ priceTotal.toFixed(2) }`;
                    cc(".purchase-modal .product--item--qt").innerHTML = `Quantidade: ${ qtd }`;
                    cc(".product-details .product-img img").src = item.images;
                }, 200);
                // close modal
                const modal = cc(".purchase-modal");
                cc(".windowpurchase").addEventListener("click", function(e) {
                    if (!modal.contains(e.target)) {
                        cc(".windowpurchase").style.opacity = 0;
                        qtd = 1;
                        cc(".product-modal .product--item--qt").innerHTML = qtd;
                        setTimeout(() => {
                            cc(".windowpurchase").style.display = "none";
                        }, 200);
                    }
                });
            });

            // close modal
            const modal = cc(".product-modal");
            cc(".windowdetails").addEventListener("click", function(e) {
                if (!modal.contains(e.target)) {
                    cc(".windowdetails").style.opacity = 0;
                    setTimeout(() => {
                        cc(".windowdetails").style.display = "none";
                        cc("#body-modal").style.overflow = "initial";
                        qtd = 1;
                        cc(".product-modal .product--item--qt").innerHTML = qtd;
                    }, 200);
                }
            });
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

function removeCart(Index) {
    cart.splice(Index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function removeCartPay(Index) {
    cart.splice(Index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    const modal = cc(".purchase-modal");
    cc(".windowpurchase").addEventListener("click", function(e) {
        if (!modal.contains(e.target)) {
            cc(".windowpurchase").style.opacity = 0;

            setTimeout(() => {
                cc(".windowpurchase").style.display = "none";
                location.reload();
            }, 200);
        }
    });
}
