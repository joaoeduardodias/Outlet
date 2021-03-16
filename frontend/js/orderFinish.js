const baseurl = "https://ecomerceoutlet.herokuapp.com";
const token = localStorage.getItem("Authorization");
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// api

async function list() {
  let data = await fetch(`${baseurl}/orders_send`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    mode: "cors",
  });
  data = await data.json();

  data.map((item) => {
    let list = c(".models .group-info").cloneNode(true);
    list.querySelector(".id-order").innerHTML = item.id_order;
    list.querySelector(".product-name").innerHTML = item.name;
    let convertPrice = item.value / 100;
    if (convertPrice) {
      const formatReal = convertPrice.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      });
      list.querySelector(".price").innerHTML = formatReal;
    } else {
      list.querySelector(".price").innerHTML = convertPrice;
    }

    item.products.products.map((product) => {
      const details = list.querySelector(".details");

      details.querySelector(".list-prod .name-prod").innerHTML = product.title;
      if (product.attributes) {
        function isEmpty(obj) {
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              return false;
            }
          }
          return JSON.stringify(obj) === JSON.stringify({});
        }
        if (isEmpty(product.attributes) == true) {
          details.querySelector(".list-prod .product-attributes").innerHTML =
            "";
        } else {
          details.querySelector(".list-prod .product-attributes").innerHTML =
            product.attributes;
        }
      }

      details.querySelector(".client-name").innerHTML = `Nome: ${item.name}`;
      details.querySelector(".client-email").innerHTML = `Email: ${item.email}`;
      details.querySelector(
        ".client-telephone"
      ).innerHTML = `Telefone: ${item.whatsapp}`;
      details.querySelector(
        ".city-name"
      ).innerHTML = `Cidade: ${item.nameCity}`;
      details.querySelector(".zip-code").innerHTML = `Cep: ${item.zip_code}`;
      details.querySelector(
        ".neighborhood"
      ).innerHTML = `Bairro: ${item.neighborhood}`;
      details.querySelector(".street").innerHTML = `Rua: ${item.street}`;
      details.querySelector(".number").innerHTML = `Nº: ${item.number}`;
    });

    c(".order-send").append(list);

    const dow = list.querySelector(".btn-down");
    const up = list.querySelector(".btn-up");
    dow.addEventListener("click", () => {
      const details = list.querySelector(".details");
      details.style.display = "initial";

      dow.style.opacity = 1;
      setTimeout(() => {
        dow.style.opacity = 0;
        dow.style.display = "none";
        up.style.display = "flex";
        up.style.opacity = 1;
      }, 300);
      details.addEventListener("animationend", (event) => {
        if (event.animationName === "dow") {
          details.querySelector(".grid").style.display = "grid";
        }
      });
    });

    up.addEventListener("click", () => {
      const details = list.querySelector(".details");

      up.style.opacity = 1;
      setTimeout(() => {
        up.style.opacity = 0;
        up.style.display = "none";
        dow.style.display = "flex";
        dow.style.opacity = 1;
      }, 300);
      details.classList.add("up");
      details.querySelector(".grid").style.display = "none";
      details.addEventListener("animationend", (event) => {
        if (event.animationName === "up") {
          details.style.display = "none";
          details.classList.remove("up");
        }
      });
    });
  });
}
list();
