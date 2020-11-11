const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
let qtd = 1;
let screenWidth = screen.width;
let cart = JSON.parse(localStorage.getItem("cart"));
cart.map((item, index) => {
    let price = item.price;
    let priceTotal = price;
    let ProductItem = c(".models .product").cloneNode(true);

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
            console.log("passei por aqui");
            console.log(`Index desse produto é ${index}`);
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        }
    );
    //comprar
    ProductItem.querySelector('.product-purchase').addEventListener('click', () => {
        location.href = './dataPayment.html'
    })
    c(".section-cart").append(ProductItem);

    if (screenWidth < 850) {
        ProductItem.addEventListener("click", () => {
            c(".windowdetails").style.opacity = 0;
            c(".windowdetails").style.display = "flex";
            setTimeout(() => {
                c(".windowdetails").style.opacity = 1;
                c("#body-modal").style.overflow = "hidden";

                c(".product-modal .product-img #img").src = item.images;
                c(".product-modal .product-title h2").innerHTML = item.title;
                c(
                    ".product-modal .product-price"
                ).innerHTML = `R$: ${item.price.toFixed(2)}`;
            }, 200);
            c(".product-modal .product--item-qtmenos").addEventListener(
                "click",
                () => {
                    if (qtd > 1) {
                        qtd--;
                        c(".product-modal .product--item--qt").innerHTML = qtd;
                        priceTotal = price * qtd;
                        c(
                            ".product-modal .product-price "
                        ).innerHTML = `R$: ${priceTotal.toFixed(2)}`;
                    }
                }
            );
            c(".product-modal .product--item-qtmais").addEventListener(
                "click",
                () => {
                    if (qtd < item.amount) {
                        qtd++;
                        c(".product-modal .product--item--qt").innerHTML = qtd;
                        priceTotal = price * qtd;
                        c(
                            ".product-modal .product-price"
                        ).innerHTML = `R$: ${priceTotal.toFixed(2)}`;
                    }
                }
            );

            // close modal
            const modal = c(".product-modal");
            c(".windowdetails").addEventListener("click", function(e) {
                if (!modal.contains(e.target)) {
                    c(".windowdetails").style.opacity = 0;
                    setTimeout(() => {
                        c(".windowdetails").style.display = "none";
                        c("#body-modal").style.overflow = "initial";
                        qtd = 1;
                        c(".product-modal .product--item--qt").innerHTML = qtd;
                    }, 200);
                }
            });
            // excluir product do carrinho
            c(".product-modal .product-trash").addEventListener("click", () => {
                console.log("passei por aqui");
                console.log(`Index desse produto é ${index}`);

                c(".product").style.opacity = 1;
                setTimeout(() => {
                    c(".product").style.opacity = 0;
                    c(".product").style.display = "none";
                }, 200);
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            });
        });
    }
});