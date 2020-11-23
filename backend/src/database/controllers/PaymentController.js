// SDK de Mercado Pago
const mercadopago = require('mercadopago');
module.exports = {
    async create(req, res) {
        mercadopago.configurations.setAccessToken("TEST-8113273517396248-112312-a471b7324ff5b0a19b8fc1a126ca4ec0-646358601");

        var payment_data = {
            transaction_amount: Number(req.body.transaction_amount),
            token: req.body.token,
            description: req.body.description,
            installments: Number(req.body.installments),
            payment_method_id: req.body.paymentMethodId,
            issuer_id: req.body.issuer,
            payer: {
                email: req.body.email,
                identification: {
                    type: req.body.docType,
                    number: req.body.docNumber
                }
            }
        };

        mercadopago.payment.save(payment_data)
            .then(function(response) {
                console.log('teste')
                    // res.status(response.status).json({
                    //     status: response.body.status,
                    //     status_detail: response.body.status_detail,
                    //     id: response.body.id
                    // });
            })
            .catch(function(error) {
                console.log(error)
                    // res.status(response.status).send(error);
            });

    }

}