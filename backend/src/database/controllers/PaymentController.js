const paypal = require('paypal-rest-sdk')
paypal.configure(process.env.PAY_MODE, process.env.PAY_CLIENT_ID, process.env.PAY_CLIENT_SECRET)


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