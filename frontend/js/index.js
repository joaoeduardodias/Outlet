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
let cm3;
let quantity;
let indeximg = 0;
let images = [];
let idImages = [];
let allImages = [];
let allIdImages = [];
let typeAtributes = [];
let optionOne = [];
let optionTwo = [];
let optionThree = [];
let optionFor = [];

const baseurl = "https://ecomerceoutlet.herokuapp.com";
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
        images = item.urls.split(",");
        idImages = item.ids.split(",");
        ProductItem.querySelector(".product img").src = images[0];
        ProductItem.querySelector(".product img").id = idImages[0];
        ProductItem.querySelector(".product-title").innerHTML = item.name;
        const formatReal = item.price.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        });
        ProductItem.querySelector(
          ".product-price"
        ).innerHTML = `R$: ${formatReal}`;

        c(".products").append(ProductItem);
        ProductItem.addEventListener("click", async () => {
          // show product
          const Product = await fetch(`${baseurl}/Productshow/${item.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            mode: "cors",
          });
          const productJson = await Product.json();
          if (productJson.attributes !== null) {
            productJson.attributes.atributes.map((item) => {
              const div = c(".product-attribute");
              const select = document.createElement("select");

              select.name = item.type_attribute;
              select.id = item.type_attribute;
              var message = document.createElement("option");
              message.textContent = `Selecione qual ${item.type_attribute} deseja`;
              select.appendChild(message);

              if (item.option_one) {
                var el01 = document.createElement("option");
                el01.textContent = item.option_one;
                el01.value = item.option_one;
                select.appendChild(el01);
              }
              if (item.option_two) {
                var el02 = document.createElement("option");
                el02.textContent = item.option_two;
                el02.value = item.option_two;
                select.appendChild(el02);
              }
              if (item.option_three) {
                var el03 = document.createElement("option");
                el03.textContent = item.option_three;
                el03.value = item.option_three;
                select.appendChild(el03);
              }
              if (item.option_for) {
                var el04 = document.createElement("option");
                el04.textContent = item.option_for;
                el04.value = item.option_for;
                select.appendChild(el04);
              }

              div.appendChild(select);
            });
          }
          // preencher as imagens
          allImages = productJson.images;
          allIdImages = productJson.idsImages;
          // preencher as variaveis para o carrinho
          key = productJson.id;
          title = productJson.name;
          price = productJson.price;
          amount = productJson.amount;
          weight = productJson.weight;
          lenght = productJson.lenght;
          width = productJson.width;
          height = productJson.height;

          c(".windowdetails").style.opacity = 0;
          c(".windowdetails").style.display = "flex";
          setTimeout(() => {
            c(".windowdetails").style.opacity = 1;
            c("#body-modal").style.overflow = "hidden";
            c(".product-img #img").src = productJson.images[indeximg];
            c(".product-title h2").innerHTML = productJson.name;
            const formatReal = productJson.price.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            });
            c(".windowdetails .product-price").innerHTML = `R$: ${formatReal}`;
            c(
              ".product-amount"
            ).innerHTML = ` ${productJson.amount}  Disponíveis`;
            c(".product-description").innerHTML = productJson.description;
            c(
              ".product-id"
            ).innerHTML = `Código do Produto:     ${productJson.id}`;
          }, 200);
        });
      }
    }); // end map

    c(".product-img .arrowleft").addEventListener("click", () => {
      if (indeximg > 0) {
        indeximg--;
        c(".product-img #img").src = allImages[indeximg];
      }
    });
    c(".product-img .arrowright").addEventListener("click", () => {
      if (indeximg < 2) {
        // tem que ter 3 fotos
        indeximg++;
        c(".product-img #img").src = allImages[indeximg];
      }
    });

    // close modal
    const modal = c(".product-modal");
    c(".windowdetails").addEventListener("click", function (e) {
      if (!modal.contains(e.target)) {
        c(".windowdetails").style.opacity = 0;
        indeximg = 0;
        c(".result").style.display = "none";
        c(".result").style.opacity = 0;
        document.getElementById("txtTracking").value = "";
        const div = c(".product-attribute");
        while (div.hasChildNodes()) {
          div.removeChild(div.firstChild);
        }

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

// add product of cart
c(".add-cart").addEventListener("click", () => {
  if (JSON.parse(localStorage.getItem("cart")))
    cart = JSON.parse(localStorage.getItem("cart"));
  const image = c(".product-img #img").getAttribute("src");

  const verifyCart = cart.find((item) => item.id === key);
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
    // CALCULA A CUBAGEM PARA O FRETE
    cm3 = (lenght * width * height) / 6000;
    // sempre considerar o peso maior, e se o cm3 for menor que 10 considerar o peso do produto
    if (cm3 < weight || cm3 < 10) {
      cm3 = weight;
    }
    let attributes = [];
    // pegar os atributos
    const div = cs(".product-attribute select");
    div.forEach((item) => {
      const attribute = item.options[item.selectedIndex].value;
      attributes.push({
        type: item.id,
        attribute,
      });
    });

    cart.push({
      id: key,
      images: image,
      title,
      price,
      amount,
      weight,
      lenght,
      width,
      height,
      cm3,
      quantity: 1,
      attributes,
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

// simulator of freight
const btnSimulator = c("#simulator");
btnSimulator.addEventListener("click", async () => {
  btnSimulator.style.backgroundColor = "#FFF";
  btnSimulator.style.color = "#f67600";
  btnSimulator.style.border = "1px solid #f67600";
  btnSimulator.style.cursor = "no-drop";

  const zipCode = document.getElementById("txtTracking").value;
  let Freight = {
    weight,
    zip_code: zipCode,
    lenght,
    width,
    height,
    methodFreight: "PAC",
  };

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
  if (DataFreightJson.MsgErro == "CEP de destino invalido.") {
    alert("Cep inválido, verifique o cep digitado");
    btnSimulator.style.backgroundColor = "#f67600";
    btnSimulator.style.color = "#FFF";
    btnSimulator.style.border = "1px solid #f67600";
    btnSimulator.style.cursor = "pointer";

    return false;
  }
  if (DataFreightJson.Valor == "0,00") {
    console.log(DataFreightJson.MsgErro);
    alert(
      "erro encontrado, por favor entre em contato com a loja para outras opções de frete"
    );
    btnSimulator.style.backgroundColor = "#f67600";
    btnSimulator.style.color = "#FFF";
    btnSimulator.style.border = "1px solid #f67600";
    btnSimulator.style.cursor = "pointer";

    return false;
  } else {
    document.getElementById(
      "days"
    ).innerHTML = `Prazo de entrega de ${DataFreightJson.PrazoEntrega} dias`;
    document.getElementById(
      "value"
    ).innerHTML = `Valor: R$:${DataFreightJson.Valor}`;
    c(".result").style.display = "flex";

    c(".result").style.opacity = 0;
    setTimeout(() => {
      c(".result").style.opacity = 1;
      btnSimulator.style.backgroundColor = "#f67600";
      btnSimulator.style.color = "#FFF";
      btnSimulator.style.border = "1px solid #f67600";
      btnSimulator.style.cursor = "pointer";
    }, 200);
  }
});
