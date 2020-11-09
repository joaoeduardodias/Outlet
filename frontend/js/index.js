let show = true;
let cart = []
let key = 0
let title = ''
let price = 0;
let amount;
const baseurl = 'http://localhost:3333'

//  LIST OF PRODUCT
async function index() {
    try {
        const data = await fetch(baseurl + '/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: "cors",
        })
        const Products = await data.json()
        Products.map((item, index) => {
            // clonar a div produto
            let ProductItem = c('.models .product').cloneNode(true)
                // preenche os dados
            if (item.available != 1) {
                ProductItem.style.display = 'none'
            } else {
                let images = []
                let idImages = []
                images = item.urls.split(',')
                idImages = item.ids.split(',')
                ProductItem.querySelector('.product img').src = images[0]
                ProductItem.querySelector('.product img').id = idImages[0]
                ProductItem.querySelector('.product-title').innerHTML = item.name;
                ProductItem.querySelector('.product-price').innerHTML = `R$: ${item.price.toFixed(2)}`;
                c('.products').append(ProductItem)


                ProductItem.addEventListener('click', () => {
                    let = indeximg = 0


                    key = item.id
                    title = item.name
                    price = item.price
                    amount = item.amount
                    c('.windowdetails').style.opacity = 0;
                    c('.windowdetails').style.display = 'flex'
                    setTimeout(() => {

                        c('.windowdetails').style.opacity = 1;
                        c('#body-modal').style.overflow = 'hidden'
                        c('.product-img #img').src = images[0]

                        c('.product-img .arrowleft').addEventListener('click', () => {
                            if (indeximg > 0) {
                                indeximg--
                                c('.product-img #img').src = images[indeximg]
                            }

                        })
                        c('.product-img .arrowright').addEventListener('click', () => {

                            if (indeximg < 2) {
                                // tem que ter 3 fotos

                                indeximg++
                                c('.product-img #img').src = images[indeximg]
                            }


                        })
                        c('.product-title h2').innerHTML = item.name
                        c('.windowdetails .product-price').innerHTML = `R$: ${item.price.toFixed(2)}`;
                        c('.product-amount').innerHTML = ` ${item.amount}  Disponíveis`
                        c('.product-description').innerHTML = item.description
                        c('.product-id').innerHTML = `Código do Produto:     ${item.id}`;



                        // close modal
                        const modal = c('.product-modal')
                        c('.windowdetails').addEventListener('click', function(e) {

                            if (!modal.contains(e.target)) {
                                c('.windowdetails').style.opacity = 0;
                                setTimeout(() => {
                                    indeximg = 0
                                    c('.windowdetails').style.display = 'none'
                                    c('#body-modal').style.overflow = 'initial'

                                }, 200)
                            }
                        })

                    }, 200)



                })

            }
        })

    } catch (error) {
        console.log(error)
    }
}
index()
const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el)


const menuSection = c(".menu-section")
const menuToggle = c(".menu-toggle")

menuToggle.addEventListener('click', () => {
    document.body.style.overflow = show ? 'hidden' : 'initial'

    menuSection.classList.toggle("on", show)
    show = !show;
})

const buttonRegister = c(".btn-Register")
const buttonLogin = c(".btn-login")
const buttonLogout = c(".btn-logout")
const buttonCart = c(".btn-cart")
const buttonDashboard = c(".btn-dash")
const token = localStorage.getItem("Authorization")


if (token) {
    const { administrador } = JSON.parse(atob(token.split(".")[1]));

    buttonRegister.classList.add('logged')
    buttonLogin.classList.add('logged')
    buttonLogout.style.display = 'flex'
    buttonCart.style.display = 'flex'
    buttonDashboard.style.display = administrador == 1 ? 'flex' : 'none'
}

buttonLogout.addEventListener('click', () => {
    localStorage.clear()
    location.href = '/'
})



// adiciona product of cart
c('.add-cart').addEventListener('click', () => {
    if (JSON.parse(localStorage.getItem('cart'))) cart = JSON.parse(localStorage.getItem('cart'))
    let image = c('.product-img #img').getAttribute('src')

    let verifyCart = cart.find((item) => item.id === key)
    if (verifyCart) {
        c('.windowdetails').style.opacity = 0;

        alert('Produto ja esta no carrinho')
        setTimeout(() => {
            c('.windowdetails').style.display = 'none'
            c('#body-modal').style.overflow = 'initial'

        }, 200)
        localStorage.setItem('cart', JSON.stringify(cart))
        cart = JSON.parse(localStorage.getItem('cart'))

    } else {
        cart.push({
            id: key,
            images: image,
            title,
            price,
            amount
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        cart = JSON.parse(localStorage.getItem('cart'))
        c('.windowdetails').style.opacity = 0;

        setTimeout(() => {
            c('.windowdetails').style.display = 'none'
            c('#body-modal').style.overflow = 'initial'

        }, 200)
    }


})