const Connection = require('../../database')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
module.exports = {
    async index(next, res) {
        try {

            const data = await Connection('User_Product')
                .join('Products', 'id_product', '=', 'Products.id')
                .select('id_sold', 'id_user', 'amount_sold',
                    'value_total',
                    'Products.name',
                )


            const sold = data.map(async(item) => {
                const User = await Connection("Users").where('Users.id', item.id_user)
                    .join('Address', 'Address.id_users', 'Users.id')
                    .join('City', 'City.id', 'Address.id_city')
                    .select(
                        'City.nameCity',
                        'City.id',
                        'Address.zip_code',
                        'Address.neighborhood',
                        'Address.name',
                        'Address.number',
                        'Users.name',
                        'Users.email',
                        'Users.whatsapp'
                    ).first()



                const sold = Object.assign({}, item, User);


                return sold

            })
            Promise.all(sold).then((value) => {

                return res.json(value)
            })



        } catch (error) {
            // next()
            console.log(error)
        }
    },
    async indexBetween(req, res, next) {
        try {
            const { date1, date2 } = req.body
            const data = await Connection("User_Product")
                .join('Products', 'id_product', '=', 'Products.id')
                .select('id_sold', 'id_product', 'amount_sold')
                .whereBetween('User_Product.created_at', [date1, date2])
            return res.json(data).send()
        } catch (error) {
            next(error)
        }
    },
    // soma a quantidade de produtos vendidos 
    async sumBetween(req, res, next) {
        try {
            const { date1, date2 } = req.body
            const [sum] = await Connection("User_Product").sum('amount_sold')
                .whereBetween('created_at', [date1, date2])

            return res.json(sum).send()

        } catch (error) {
            next(error)
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
            const { amount_sold, value_total } = req.body

            const { amount } = await Connection("Products").select('amount').where('id', id_product).first() // estoque

            if (amount <= 0) {
                const available = 0;
                await Connection("Products").update({ available }).where('id', id_product)
                return res.json({ message: 'Product unavailable' }) // produto indisponivel
            }
            let newAmount = amount - amount_sold;
            if (newAmount < 0) {
                return res.json({ message: "Quantity unavailable" })
            }
            if (newAmount == 0) {
                const available = 0;
                await Connection("Products").update({ available }).where('id', id_product)
                return res.send()

            }



            const id_sold = crypto.randomBytes(3).toString('HEX')

            await Connection('User_Product').insert({
                id_sold,
                id_product,
                id_user,
                amount_sold,
                value_total
            })

            await Connection("Products").update({
                amount: newAmount
            }).where('id', id_product)



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