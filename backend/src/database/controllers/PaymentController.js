// SDK de Mercado Pago
// const mercadopago = require('mercadopago');
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY)
const calculateOrderAmount = (items) => {
    // calcular o preço total aqui
    const price = parseFloat(items.price)
    const total = price.toString().replace(".", ",")
        // const priceincents = price * 100
    console.log("preco" + price)
    console.log("total" + total)
        // console.log("centavos"+priceincents)
    return 1400; // valor do produto
};
const chargeCustomer = async(customerId) => {
    // Pesquise os métodos de pagamento disponíveis para o cliente
    const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card"
    });
    // Cobrar do cliente e método de pagamento imediatamente
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items), // valor do produto
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

module.exports = {
    async create(req, res) {


        //  STRIPE 


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









    },

};