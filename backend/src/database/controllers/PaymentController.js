// SDK de Mercado Pago
const mercadopago = require('mercadopago');
module.exports = {
    async create(req, res) {
        mercadopago.configurations.setAccessToken("TEST-3078541527341225-112412-e1d0f60d041f863c6d28410526c2913e-676623518");

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
                res.status(response.status).json({
                    status: response.body.status,
                    status_detail: response.body.status_detail,
                    id: response.body.id
                });
            })
            .catch(function(error) {
                console.log(error)
                res.status(response.status).send(error);
            });

    }

}