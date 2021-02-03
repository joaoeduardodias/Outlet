const paypal = require('paypal-rest-sdk')
paypal.configure(PROCCESS.ENV.PAY_MODE, PROCCESS.ENV.PAY_CLIENT_ID, PROCCESS.ENV.PAY_CLIENT_SECRET)


module.exports = {
    // quando clicar para pagar 
    async create(req, res) {
        const { price, id: product_id, amount_sold: quantity } = req.body
        console.log(price, product_id, quantity)

    },
    // // quando pagar com sucesso
    // async success(req, res) {

    //     res.send({ success: true })

    // },
    // // quando o cliente cancelar a compra 
    // async cancel(req, res) {
    //     res.send({ cancel: true })
    // }
}