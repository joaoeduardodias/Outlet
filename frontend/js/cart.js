const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el)
let qtd = 1

let screenWidth = screen.width
let cart = JSON.parse(localStorage.getItem('cart'))

cart.map((item) => {
    let price = item.price
    let priceTotal = price
    let ProductItem = c('.models .product').cloneNode(true)

    ProductItem.querySelector('.product-info-img .product-img img').src = item.images
    ProductItem.querySelector('.product-info-img .product-title h2').innerHTML = item.title
    ProductItem.querySelector('.product-info-img .product-price').innerHTML = `R$: ${item.price.toFixed(2)}`;
    c('.section-cart').append(ProductItem)

    if (screenWidth < 850) {

        ProductItem.addEventListener('click', () => {

            c('.windowdetails').style.opacity = 0;
            c('.windowdetails').style.display = 'flex'
            setTimeout(() => {
                c('.windowdetails').style.opacity = 1;
                c('#body-modal').style.overflow = 'hidden'

                c('.product-modal .product-img #img').src = item.images
                c('.product-modal .product-title h2').innerHTML = item.title
                c('.product-modal .product-price').innerHTML = `R$: ${item.price.toFixed(2)}`;




                c('.product-modal .product--item-qtmenos').addEventListener('click', () => {
                    if (qtd > 1) {
                        qtd--
                        c('.product-modal .product--item--qt').innerHTML = qtd
                        priceTotal = price * qtd
                        c('.product-modal .product-price ').innerHTML = `R$: ${priceTotal.toFixed(2)}`;

                    }

                })
                c('.product-modal .product--item-qtmais').addEventListener('click', () => {
                    qtd++
                    c('.product-modal .product--item--qt').innerHTML = qtd
                    priceTotal = price * qtd
                    c('.product-modal .product-price').innerHTML = `R$: ${priceTotal.toFixed(2)}`;

                })


            }, 200)

            // close modal
            const modal = c('.product-modal')
            c('.windowdetails').addEventListener('click', function(e) {

                if (!modal.contains(e.target)) {
                    c('.windowdetails').style.opacity = 0;
                    setTimeout(() => {
                        c('.windowdetails').style.display = 'none'
                        c('#body-modal').style.overflow = 'initial'
                        qtd = 1
                        c('.product-modal .product--item--qt').innerHTML = qtd

                    }, 200)
                }
            })


        })
    } else {
        qtd = 1;
        c('.product-options .product--item--qt').innerHTML = qtd
        c('.product-info .product-price ').innerHTML = `R$: ${price.toFixed(2)}`;
        c('.product-options .product--item-qtmenos').addEventListener('click', () => {
            if (qtd > 1) {
                qtd--
                c('.product-options .product--item--qt').innerHTML = qtd
                priceTotal = price * qtd
                c('.product-info .product-price ').innerHTML = `R$: ${priceTotal.toFixed(2)}`;

            }

        })
        c('.product-options .product--item-qtmais').addEventListener('click', () => {
            qtd++
            c('.product-options .product--item--qt').innerHTML = qtd
            priceTotal = price * qtd
            c('.product-info .product-price').innerHTML = `R$: ${priceTotal.toFixed(2)}`;

        })
    }

})
