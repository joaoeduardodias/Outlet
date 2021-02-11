let show = true;
let cart = [];
let key = 0;
let title = "";
let price = 0;
let amount;
let weight;
let typeWeight;
let lenght;
let width;
let height;
let indeximg = 0;
let images = [];
let idImages = [];
let typeAtributes = [];
let optionOne = [];
let optionTwo = [];
let optionThree = [];
let optionFor = [];

const baseurl = "https://ecomerceoutlet.herokuapp.com";

//  LIST PRODUCTS
async function index() {
    try {
        const data = await fetch(baseurl + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            mode: "cors",
        });
        const Products = await data.json();
        Products.map((item) => {



            // clonar a div produto
            let ProductItem = c(".models .product").cloneNode(true);
            // preenche os dados
            if (item.available != true) {
                ProductItem.style.display = "none";
            } else {
                weight = item.weight;
                typeWeight = item.typeWeight;
                lenght = item.lenght;
                width = item.width;
                height = item.height;
                images = item.urls.split(",");

                idImages = item.ids.split(",");


                ProductItem.querySelector(".product img").src = images[0];
                ProductItem.querySelector(".product img").id = idImages[0];
                ProductItem.querySelector(".product-title").innerHTML = item.name;
                ProductItem.querySelector(".product-price").innerHTML = `R$: ${item.price.toFixed(2)}`;

                c(".products").append(ProductItem);

                ProductItem.addEventListener("click", () => {
                    key = item.id;
                    title = item.name;
                    price = item.price;
                    amount = item.amount;
                    images = item.urls.split(",");
                    idImages = item.ids.split(",");
                    indeximg = 0
                    typeAtributes = item.type_attribute.split(',')
                    optionOne = item.option_one.split(',')
                    optionTwo = item.option_two.split(',')
                    optionThree = item.option_three.split(',')
                    optionFor = item.option_for.split(',')
                    c(".windowdetails").style.opacity = 0;
                    c(".windowdetails").style.display = "flex";
                    setTimeout(() => {
                        c(".windowdetails").style.opacity = 1;
                        c("#body-modal").style.overflow = "hidden";

                        c(".product-img #img").src = images[indeximg]

                        c(".product-title h2").innerHTML = item.name;
                        c(".windowdetails .product-price").innerHTML = `R$: ${item.price.toFixed(2)}`;
                        c(".product-amount").innerHTML = ` ${item.amount}  Disponíveis`;
                        c(".product-description").innerHTML = item.description;
                        c(".product-id").innerHTML = `Código do Produto:     ${item.id}`;
                        if (typeAtributes.length <= 1) {
                            c('.product-attribute').style.display = 'none'
                        }
                        // adicionar o select referente ao atributo
                        // const select = c('.product-attribute')

                        typeAtributes.map(item => {
                            var select = document.createElement('select')
                            var el = document.createElement('option')
                            el.textContent = `Selecione qual ${item} deseja`
                            el.value = item
                            select.appendChild(el)
                            console.log(select)
                            c('.product-attribute').appendChild(select)
                        })

                    }, 200);
                });
            }
        });

        c(".product-img .arrowleft").addEventListener("click", () => {
            if (indeximg > 0) {
                indeximg--;
                c(".product-img #img").src = images[indeximg];
            }
        });
        c(".product-img .arrowright").addEventListener("click", () => {
            if (indeximg < 2) {
                // tem que ter 3 fotos
                indeximg++;
                c(".product-img #img").src = images[indeximg];
            }
        });

        // close modal
        const modal = c(".product-modal");
        c(".windowdetails").addEventListener("click", function(e) {
            if (!modal.contains(e.target)) {
                c(".windowdetails").style.opacity = 0;
                indeximg = 0;

                setTimeout(() => {
                    c(".windowdetails").style.display = "none";
                    c("#body-modal").style.overflow = "initial";
                }, 200);
            }
        });
    } catch (error) {
        console.log(error);
    }
}
index();
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

const menuSection = c(".menu-section");
const menuToggle = c(".menu-toggle");

menuToggle.addEventListener("click", () => {
    document.body.style.overflow = show ? "hidden" : "initial";

    menuSection.classList.toggle("on", show);
    show = !show;
});

const buttonRegister = c(".btn-Register");
const buttonLogin = c(".btn-login");
const buttonLogout = c(".btn-logout");
const buttonCart = c(".btn-cart");
const buttonDashboard = c(".btn-dash");
const token = localStorage.getItem("Authorization");

if (token) {
    const { administrador } = JSON.parse(atob(token.split(".")[1]));

    buttonRegister.classList.add("logged");
    buttonLogin.classList.add("logged");
    buttonLogout.style.display = "flex";
    buttonCart.style.display = "flex";
    buttonDashboard.style.display = administrador == true ? "flex" : "none";
    c(".product-id").style.display = administrador == true ? "flex" : "none";
}

buttonLogout.addEventListener("click", () => {
    localStorage.clear();
    location.href = "/";
});

const tokenUser = localStorage.getItem("Authorization");

if (!tokenUser) {
    c(".add-cart").addEventListener("click", () => {
        location.href = "./pages/login.html";
    });
}
const dataUser = JSON.parse(atob(tokenUser.split(".")[1])); // decodificando o token

if (dataUser.administrador === 1) {
    c(".product-id").style.display = "flex";
}

// adiciona product of cart
c(".add-cart").addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("cart")))
        cart = JSON.parse(localStorage.getItem("cart"));
    let image = c(".product-img #img").getAttribute("src");

    let verifyCart = cart.find((item) => item.id === key);
    if (verifyCart) {
        c(".windowdetails").style.opacity = 0;

        alert("Produto ja esta no carrinho");
        setTimeout(() => {
            c(".windowdetails").style.display = "none";
            c("#body-modal").style.overflow = "initial";
        }, 200);
        localStorage.setItem("cart", JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem("cart"));
    } else {
        cart.push({
            id: key,
            images: image,
            title,
            price,
            amount,
            weight,
            typeWeight,
            lenght,
            width,
            height,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem("cart"));
        c(".windowdetails").style.opacity = 0;

        setTimeout(() => {
            c(".windowdetails").style.display = "none";
            c("#body-modal").style.overflow = "initial";
        }, 200);
    }
});
