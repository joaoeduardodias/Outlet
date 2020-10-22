const Connection = require('../../database')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
module.exports = {
    async index(next, res) {
        try {
            const data = await Connection('User_Product')
                .join('Products', 'id_product', '=', 'Products.id')
                .select('id_sold', 'id_product', 'amount_sold',
                    'value_total',
                    'Products.name',
                )
            return res.json(data).send()

        } catch (error) {
            // next()
            console.log(error)
        }
    },
    async create(req, res, next) {
        try {
            // id of product
            const { id: id_product } = req.params
                // id of User
            let id_user = '';
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                return id_user = decoded.id
            });
            const { amount_cart, value_total } = req.body
            const id = crypto.randomBytes(3).toString('HEX')

            await Connection('User_Product').insert({
                id,
                id_product,
                id_user,
                amount_cart,
                value_total
            })
            return res.status(201).send()

        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Connection("User_Product").where({ id }).del()
            return res.status(204).send()
        } catch (error) {
            next(error)
        }


    }

}