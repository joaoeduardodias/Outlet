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
  console.log(dataAddress[0]);

  // let card = {};
  // card.card_holder_name = "Morpheus Fishburne";
  // card.card_expiration_date = "0922";
  // cpf = "00000000000"
  // card.card_number = "4111111111111111";
  // card.card_cvv = "123";

  let validity = document.getElementById("validate").value;
  validity = validity.replace(/[^0-9]/g, "");
  let cpf = document.getElementById("cpf").value;
  cpf = cpf.replace(/[^0-9]/g, "");
  let phone = `+55${dataUser.whatsapp.toString()}`;
  PricetotalPagarme = parseInt(PricetotalPagarme * 100);
  console.log(parseInt(PricetotalPagarme));

  const data = {
    api_key: "ak_test_G32g3eJiRTZO7IhtJ61wySsGNFnU2e",
    amount: PricetotalPagarme,
    card_number: document.getElementById("card_number").value,
    card_cvv: document.getElementById("card_cvv").value,
    card_expiration_date: "0922",
    card_holder_name: document.getElementById("card_holder_name").value,

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

  let response = await fetch(`${baseurl}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    body: JSON.stringify(data),
  });
  response = await response.json();
  // enviar uma notificacao de tudo certo
  // conversar com a andreia sobre a forma de parcelamento
  console.log(response);
}
