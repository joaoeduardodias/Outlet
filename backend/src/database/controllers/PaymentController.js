const paypal = require('paypal-rest-sdk')
const paypalConfig = require('../../config/payment.json')
paypal.configure(paypalConfig)


module.exports = {
    // quando clicar para pagar 
    async create(req, res) {
        const { items } = req.body
        console.log(items)
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://return.url",
                "cancel_url": "http://cancel.url"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": items.id,
                        "price": items.price,
                        "currency": "BRL",
                        "quantity": items.amount_sold
                    }]
                },
                "amount": {
                    "currency": "BRL",
                    "total": items.price
                },
                "description": "Outlet Multimarcas."
            }]
        };


        paypal.payment.create(create_payment_json, function(error, payment) {
            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log(payment);
            }
        });


        res.json({ message: success })
    },

}