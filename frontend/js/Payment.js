const token = localStorage.getItem("Authorization");
const dataUser = JSON.parse(atob(tokenUser.split(".")[1]));

document.getElementById("payer").addEventListener("click", (e) => {
  e.preventDefault();
  purchase();
});

async function purchase() {
  let dataAddress = await fetch(`${baseurl}/address/${dataUser.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
  });
  dataAddress = await dataAddress.json();

  const installments = document.getElementById("installments").value;

  let validity = document.getElementById("validate").value;
  validity = validity.replace(/[^0-9]/g, "");
  let cpf = document.getElementById("cpf").value;
  cpf = cpf.replace(/[^0-9]/g, "");
  let phone = `+55${dataUser.whatsapp.toString()}`;
  // let card = {};
  // card.card_holder_name = "Morpheus Fishburne";
  // card.card_expiration_date = "0922";
  // cpf = "00000000000"
  // card.card_number = "4111111111111111";
  // card.card_cvv = "123";

  PricetotalPagarme = parseInt(PricetotalPagarme * 100);

  const data = {
    api_key: "ak_test_G32g3eJiRTZO7IhtJ61wySsGNFnU2e",
    amount: PricetotalPagarme,
    card_number: document.getElementById("card_number").value,
    card_cvv: document.getElementById("card_cvv").value,
    card_expiration_date: validity,
    card_holder_name: document.getElementById("card_holder_name").value,
    installments,
    customer: {
      external_id: dataUser.id,
      name: dataUser.name,
      type: "individual",
      country: "br",
      email: dataUser.email,
      documents: [
        {
          type: "cpf",
          number: cpf,
        },
      ],
      phone_numbers: [phone],
    },
    billing: {
      name: "Outlet Multimarcas",
      address: {
        country: "br",
        state: "ms",
        city: "Aparecida do Taboado",
        neighborhood: "Vilas Boas",
        street: "Av. Presidente Vargas",
        street_number: "5374",
        zipcode: "79570000",
      },
    },
    shipping: {
      name: dataUser.name,
      fee: parseInt(value * 100),

      delivery_date: dayjs().add(prazoEntrega, "days").format("YYYY-MM-DD"),
      expedited: true,
      address: {
        country: "br",
        state: dataAddress[0].uf.toLowerCase(),
        city: dataAddress[0].nameCity,
        neighborhood: dataAddress[0].neighborhood,
        street: dataAddress[0].street,
        street_number: dataAddress[0].number.toString(),
        zipcode: dataAddress[0].zip_code.toString(),
      },
    },
    items: cart.map((product) => ({
      id: product.id,
      title: product.title,
      unit_price: product.price * 100,
      quantity: product.quantity,
      tangible: true,
    })),
  };
  let solds = { products: cart };
  // card.card_number = "4111111111111111";

  let dataaa = await fetch(`${baseurl}/product_sold`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    mode: "cors",
    body: JSON.stringify(solds),
  });
  let validate = await dataaa.json();
  console.log(validate);

  if (validate.message == "Product unavailable") {
    swal({
      type: "error",
      title: "Produto indisponível",
      text: "Por favor, entre em contato conosco",
    });
    return false;
  }
  if (validate.message == "Quantity unavailable") {
    swal({
      type: "error",
      title: "Quantidade indisponível no estoque",
      text: "Por favor, entre em contato conosco",
    });
    return false;
  }

  let response = await fetch(`${baseurl}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    mode: "cors",
    body: JSON.stringify(data),
  });
  response = await response.json();

  if (response.error) {
    swal({
      type: "error",
      title: "Oopss...",
      text: "Erro Encontrado, por favor verifique se os dados estão corretos",
    });
    return false;
  }
  if (response.data.refuse_reason == "acquirer") {
    swal({
      type: "error",
      title: "Pagamento não autorizado",
      text: "Por favor, verifique se os dados estão corretos",
    });
    return false;
  }
  if (response.data.status !== "paid") {
    swal({
      type: "error",
      title: "Pagamento não autorizado",
      text: response.data.refuse_reason,
    });
    return false;
  }
  let purchase = { products: cart, value: PricetotalPagarme };
  // api para debitar no sistema
  let res = await fetch(`${baseurl}/order/${dataUser.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    mode: "cors",
    body: JSON.stringify(purchase),
  });
  res = await res.json();
  if (res.message == "Error") {
    swal({
      type: "error",
      title: "Ooopss...",
      text:
        "Aconteceu um erro, por favor tente novamente ou entre em contato conosco!",
    });
    return false;
  }
  swal(
    {
      type: "success",
      title: "Pagamento Realizado",
      text:
        "Sua Compra foi finalizada com sucesso! Te enviaremos em breve um e-mail com as demais informações",
    }
    // card.card_number = "4111111111111111";
  );
  cc(".swal2-confirm").addEventListener("click", function () {
    localStorage.removeItem("cart");
    location.href = "/";
  });
}
