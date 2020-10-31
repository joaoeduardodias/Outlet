const crypto = require("crypto");
const Connection = require("../../database");
const jwt = require("jsonwebtoken");
// const knex = require("../../database");
// const knex = require('knex')

module.exports = {
    async index(next, res) {
        try {
            const data = await Connection("Products")

            .select(
                    "Products.id",
                    "Products.name",
                    Connection.raw(`group_concat(Images.url) as urls`),
                    Connection.raw(`group_concat(Images.id) as ids`),
                    "description",
                    "price",
                    "amount",
                    "available"
                )
                .leftJoin('Images', 'Products.id', '=', 'Images.id_product').groupBy('Products.id')

            return res.json(data)







        } catch (error) {
            // next(error);
            console.log(error);
        }
    },
    async create(req, res, next) {
        try {
            let adm = false;
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (decoded.administrador != 0) {
                    return (adm = true);
                }
            });
            if (adm === false) {
                return res.status(401).json({ message: "User is not adm" });
            }
            const { name, price, amount, description } = req.body;
            const verifyName = await Connection("Products")
                .select("name")
                .where({ name })
                .first();
            if (verifyName)
                return res.json({
                    message: "There is already a product with that name",
                });

            const id = crypto.randomBytes(3).toString("HEX");

            await Connection("Products").insert({
                id,
                name,
                price,
                amount,
                description,
            });

            return res.status(201).send();
        } catch (error) {
            // next(error)
            console.log(error);
        }
    },
    async update(req, res, next) {
        try {
            let adm = false;
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (decoded.administrador != 0) {
                    return (adm = true);
                }
            });
            if (adm === false) {
                return res.status(401).json({ message: "User is not adm" });
            }
            const { id } = req.params;
            const { name, price, description, amount, available } = req.body;
            await Connection("Products")
                .update({
                    name,
                    price,
                    description,
                    amount,
                    available,
                })
                .where({ id });

            return res.status(200).send();
        } catch (error) {
            next(error);
        }
    },
    async delete(req, res, next) {
        try {
            let adm = false;
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (decoded.administrador != 0) {
                    return (adm = true);
                }
            });
            if (adm === false) {
                return res.status(401).json({ message: "User is not adm" });
            }
            const { id } = req.params;

            await Connection("Products").where({ id }).del();
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};