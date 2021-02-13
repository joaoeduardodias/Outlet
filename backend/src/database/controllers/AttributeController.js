const crypto = require("crypto");
const Connection = require("../../database");
const jwt = require("jsonwebtoken");

module.exports = {


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
            const {
                type_attribute,
                option_one,
                option_two,
                option_three,
                option_for,
            } = req.body;
            const { id_product } = req.params


            const idAttribute = crypto.randomBytes(3).toString("HEX");


            await Connection('attributes').insert({
                id:idAttribute,
                type: type_attribute,
                option_one,
                option_two,
                option_three,
                option_for,
                id_product
            })

            return res.status(201).json({ message: 'create' });

        } catch (error) {
            // next(error)
            console.log(error);
            return res.status(500).json({ message: 'Error' + error })
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
            const {
                type_attribute,
                option_one,
                option_two,
                option_three,
                option_for,
            } = req.body;

            await Connection('attributes').update({

                type: type_attribute,
                option_one,
                option_two,
                option_three,
                option_for,

            }).where({ id })

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
            const { id } = req.params
            await Connection('attributes').where({ id }).del()


            return res.json({ message: 'success' }).send()
        } catch (error) {
            next(error);
        }
    },
};