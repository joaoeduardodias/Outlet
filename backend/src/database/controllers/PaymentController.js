// SDK de Mercado Pago
// const mercadopago = require('mercadopago');
module.exports = {
  async create(req, res) {
    //     mercadopago.configurations.setAccessToken("TEST-3078541527341225-112412-e1d0f60d041f863c6d28410526c2913e-676623518");

    //     var payment_data = {
    //         transaction_amount: Number(req.body.transaction_amount),
    //         token: req.body.token,
    //         description: req.body.description,
    //         installments: Number(req.body.installments),
    //         payment_method_id: req.body.paymentMethodId,
    //         issuer_id: req.body.issuer,
    //         payer: {
    //             email: req.body.email,
    //             identification: {
    //                 type: req.body.docType,
    //                 number: req.body.docNumber
    //             }
    //         }
    //     };

    //     mercadopago.payment.save(payment_data)
    //         .then(function(response) {
    //             res.status(response.status).json({
    //                 status: response.body.status,
    //                 status_detail: response.body.status_detail,
    //                 id: response.body.id
    //             });
    //         })
    //         .catch(function(error) {
    //             console.log(error)
    //             res.status(response.status).send(error);
    //         });

    // }

    //  STRIPE STRIPE STRIPE STRIPE STRIPE STRIPE

    const Stripe = require("stripe");
    const stripe = Stripe(process.env.STRIPE_SECRETE_KEY);

    const calculateOrderAmount = (items) => {
      // calcular o preço total aqui
      return 1400; // valor do produto
    };

    const chargeCustomer = async (customerId) => {
        // Pesquise os métodos de pagamento disponíveis para o cliente
        const paymentMethods = await stripe.paymentMethods.list({
          customer: customerId,
          type: "card"
        });
        // Cobrar do cliente e método de pagamento imediatamente
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 1099, // valor do produto
          currency: "usd",
          customer: customerId,
          payment_method: paymentMethods.data[0].id,
          off_session: true,
          confirm: true
        });
        if (paymentIntent.status === "succeeded") {
          console.log("✅ Successfully charged card off session");
        }
      }





    async (req, res) => {
      const { items } = req.body;
      // salvar um cartao para compras futuras

      const customer = await stripe.customers.create();

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        setup_future_usage: "off_session",
        amount: calculateOrderAmount(items),
        currency: "usd",
      });
      res.json({
        clientSecret: paymentIntent.client_secret,
      });
    };
  },
};
