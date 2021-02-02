const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const calculateOrderAmount = (items) => {
    // calcular o preço total aqui
    const price = items.price;

    const numberTotal = parseFloat(price) * 100;
    const priceInCents = parseInt(numberTotal.toFixed(2));

    return priceInCents; // valor do produto
};
const chargeCustomer = async(customerId) => {
    // Pesquise os métodos de pagamento disponíveis para o cliente
    const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
    });
    // Cobrar do cliente e método de pagamento imediatamente
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items), // valor do produto
        currency: "brl",
        customer: customerId,
        payment_method: paymentMethods.data[0].id,
        off_session: true,
        confirm: true,

    });
    if (paymentIntent.status === "succeeded") {
        console.log("✅ Successfully charged card off session");
    }
};

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
            currency: "brl",
            // teste
            payment_method: req.body.payment_method_id,
            payment_method_options: {
                card: {
                    installments: {
                        enabled: true,
                    },
                },
            },
        });
        res.json({
            intent_id: paymentIntent.id,
            available_plans: paymentIntent.payment_method_options.card.installments.available_plans,
            clientSecret: paymentIntent.client_secret,
        });
    },
    async confirm_payment(request, response) {
        try {
            let confirmData = {};
            if (request.body.selected_plan !== undefined) {
                confirmData = {
                    payment_method_options: {
                        card: {
                            installments: {
                                plan: request.body.selected_plan,
                            },
                        },
                    },
                };
            }

            const intent = await stripe.paymentIntents.confirm(
                request.body.payment_intent_id,
                confirmData,
            );

            return response.send({ success: true, status: intent.status });
        } catch (err) {
            return response.status(500).send({ error: err.message });
        }
    }
};