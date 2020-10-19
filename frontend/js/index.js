let show = true;

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
    buttonCart.style.display = administrador == 0 ? 'flex' : 'none'
    buttonDashboard.style.display = administrador == 1 ? 'flex' : 'none'
}

buttonLogout.addEventListener('click', () => {
    localStorage.clear()
    location.href = '/'
})

//  LIST OF PRODUCT
products.map((item, index) => {
    // clonar a div produto
    let ProductItem = c('.models .product').cloneNode(true)
        // preenche os dados
    ProductItem.querySelector('.product-title').innerHTML = item.name;
    ProductItem.querySelector('.product-price').innerHTML = `R$: ${item.price.toFixed(2)}`;
    c('.products').append(ProductItem)

    ProductItem.addEventListener('click', () => {
        c('.windowdetails').style.opacity = 0;
        c('.windowdetails').style.display = 'flex'
        setTimeout(() => {
            c('.windowdetails').style.opacity = 1;
            c('#body-modal').style.overflow = 'hidden'

            c('.product-title h2').innerHTML = item.name
            c('.windowdetails .product-price').innerHTML = `R$: ${item.price.toFixed(2)}`;
            c('.product-amount').innerHTML = ` ${item.amount}  Disponíveis`
            c('.product-description').innerHTML = item.description

            const modal = c('.product-modal')
            c('.windowdetails').addEventListener('click', function(e) {

                if (!modal.contains(e.target)) {
                    setTimeout(() => {
                        c('.windowdetails').style.opacity = 0;
                        c('.windowdetails').style.display = 'none'
                        c('#body-modal').style.overflow = 'initial'

                    }, 200)
                }
            })

        }, 200)

    })

})
