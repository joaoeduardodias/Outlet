// ASSIM QUE O GATEWAY DE PAGAMENTO AUTORIZAR A COMPRA, CHAMAR A API QUE REGISTRA A VENDA DO PRODUTO
// enviar de alguma outra forma
// "api_key": "ak_test_G32g3eJiRTZO7IhtJ61wySsGNFnU2e"
// coisas para enviar para a api
function purchase() {
  const data = {
    amount: total,
    payment_method: "boleto",
    customer: {
      type: "individual",
      country: "br",
      name: "Joao Dias",
      email: "contato@outletmultimarcas.com",
      phone_numbers: ["+5511999999999", "+5511888888888"],
      documents: [
        {
          type: "cpf",
          number: "00000000000",
        },
      ],
    },
    shipping: {
      name: "Outlet Multimarcas",
      fee: 1000,
      delivery_date: dayjs().add(prazoEntrega, "days").format("YYYY-MM-DD"),
      expedited: true,
      address: {
        country: "br",
        state: "MS",
        city: "Aparecida do Taboado",
        neighborhood: "Vilas Boas",
        street: "Av. Presidente Vargas",
        // adicionar o endereço da empresa e terminar a configuração
        street_number: "999",
        zipcode: "03424030",
      },
    },
    items: [
      {
        id: "a123",
        title: "Trono de Ferro",
        unit_price: 120000,
        quantity: 1,
        tangible: true,
      },
      {
        id: "b123",
        title: "Capa Negra de Inverno",
        unit_price: 30000,
        quantity: 1,
        tangible: true,
      },
    ],
  };
}

// esse billing fica fixo
// "billing": {
//   "name": "Joao Dias",
//   "address": {
//     "country": "br",
//     "state": "SP",
//     "city": "São Paulo",
//     "neighborhood": "Vila Carrao",
//     "street": "Rua Lobo",
//     "street_number": "999",
//     "zipcode": "03424030"
//   }
// }
