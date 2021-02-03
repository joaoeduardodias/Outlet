const paypal = require('paypal-rest-sdk')
const paypalConfig = require('../../config/payment.json')
paypal.configure(paypalConfig)


module.exports = {
    // quando clicar para pagar 
    async create(req, res) {
        res.send({ success: true })
    },
    // quando pagar com sucesso
    async success(req, res) {

        res.send({ success: true })

    },
    // quando o cliente cancelar a compra 
    async cancel(req, res) {
        res.send({ cancel: true })
    }
}