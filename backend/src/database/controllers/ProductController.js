const crypto = require("crypto");
const Connection = require("../../database");
const jwt = require("jsonwebtoken");
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

module.exports = {
    async index(next, res) {
        try {
            const data = await Connection("Products")
                .select(
                    "Products.id",
                    "Products.name",
                    "description",
                    "price",
                    "amount",
                    "available",
                    "weight",
                    "lenght",
                    "width",
                    "height",
                    // Connection.raw(`group_concat(Images.url) as urls`),
                    // Connection.raw(`group_concat(Images.id) as ids`),
                    Connection.raw(`array_to_string(ARRAY_AGG(url), ',') urls`),
                    Connection.raw(`array_to_string(ARRAY_AGG(id_image), ',') ids`)
                ).leftJoin('Images', 'Products.id', "=", 'Images.id_product').groupBy('Products.id')

            return res.json(data)

        } catch (error) {
            // next(error);
            console.log(error)
        }
    },
    async show(req, res, next) {
        try {
            const { id } = req.params
            const product = await Connection('Products')
                .select(
                    "Products.id",
                    "Products.name",
                    "description",
                    "price",
                    "amount",
                    "available",
                    "weight",
                    "lenght",
                    "width",
                    "height",
                    // Connection.raw(`group_concat(Images.url) as urls`),
                    // Connection.raw(`group_concat(Images.id) as ids`),
                    Connection.raw(`array_to_string(ARRAY_AGG(url), ',') urls`),
                    Connection.raw(`array_to_string(ARRAY_AGG(id_image), ',') ids`)
                ).leftJoin('Images', 'Products.id', "=", 'Images.id_product')
                .groupBy('Products.id')
                .where('Products.id', id)
                .first()
            if (!product) {
                return res.json({ message: "Not existe is product" })
            }

            return res.json(product)
        } catch (error) {
            next(error)
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
            const { name, price, amount, description, weight, typeWeight, lenght, width, height } = req.body;
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
                weight,
                lenght,
                width,
                height
            });

            return res.status(201).json({ message: 'create', id });
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
            const { name, price, amount, available, description, weight, typeWeight, lenght, width, height } = req.body;

            await Connection("Products")
                .update({
                    name,
                    price,
                    description,
                    amount,
                    available,
                    weight,
                    lenght,
                    width,
                    height
                })
                .where({ id });

            return res.status(200).json({ message: 'succcess' }).send();
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
            const { key } = await Connection('Images')
                .select('key')
                .where('id_product', id).first()
            console.log(key)
            await Connection('Images').where('id_product', id).del()
            if (process.env.STORAGE_TYPE === 's3') {
                s3.deleteObject({
                    Bucket: process.env.BUCKET_NAME,
                    Key: key
                }).promise()
                return res.status(204).send()

            } else {
                promisify(fs.unlink)(
                    path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', key)
                )
            }
            await Connection("Products").where({ id }).del();
            return res.json({ message: 'success' })
        } catch (error) {
            next(error);
        }
    },
};