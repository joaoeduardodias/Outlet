const paypal = require('paypal-rest-sdk')
paypal.configure(process.env.PAY_MODE, process.env.PAY_CLIENT_ID, process.env.PAY_CLIENT_SECRET)


module.exports = {
    // quando clicar para pagar 
    async create(req, res) {
        const { items } = req.body
        console.log(items)
        const json_payment = {
            "intent": "sale",
            "payer": { payment_method: "paypal" },
            "transactions": [{
                "item_list": { "items": items },
                "amount": items.amount_sold,
                "description": "Outlet Multimarcas"
            }]
        }
        paypal.payment.create(json_payment, (err, payment) => {
            if (err) {
                console.log(err)
            } else {
                payment.links.forEach((link) => {
                    if (link.rel === 'approval_url') return res.redirect(link.rel)
                })
            }
        })

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