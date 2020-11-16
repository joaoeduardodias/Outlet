const crypto = require("crypto");
const Connection = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async index(req, res, next) {
        try {
            let adm = false
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (decoded.administrador != 0) {
                    return adm = true
                }
            });
            if (adm === false) {

                return res.status(401).json({ message: "User is not adm" })
            }
            const users = await Connection("Users");
            return res.json(users);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {

            const { name, email, whatsapp } = req.body;
            const user = await Connection("Users").select('email').where({ email }).first()
            if (user) return res.json({ message: "Email already registered, try another" })
            const password = await bcrypt.hash(req.body.password, 5);
            const id = crypto.randomBytes(3).toString("HEX");

            await Connection("Users").insert({
                id,
                name,
                email,
                password,
                whatsapp,
            });

            return res.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async update(req, res, next) {
        try {
            let userLogged = '';
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                userLogged = decoded.id
            });
            const { id } = req.params;
            if (userLogged != id) return res.json({ message: "You not Update in other users" })

            const { name, email, whatsapp } = req.body;
            const password = await bcrypt.hash(req.body.password, 5);


            await Connection("Users")
                .update({
                    name,
                    email,
                    password,
                    whatsapp,

                })
                .where({ id });

            return res.send();
        } catch (error) {
            next(error);
        }
    },
    async updateADM(req, res, next) {
        try {
            let adm = false
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (decoded.administrador != 0) {
                    return adm = true
                }
            });
            if (adm === false) {
                return res.status(401).json({ message: "User is not adm" })
            }
            const { administrador } = req.body;


            const { id } = req.params;
            await Connection("Users")
                .update({
                    administrador
                })
                .where({ id });

            return res.send();
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            let userLogged = '';
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                userLogged = decoded.id
            });
            const { id } = req.params;
            if (userLogged != id) return res.json({ message: "You not Delete  other user" })
            await Connection('Address').where('id_users', userLogged).del()
            await Connection("Users").where({ id }).del();
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
    async deleteADM(req, res, next) {
        try {
            let adm = false
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (decoded.administrador != 0) {
                    return adm = true
                }
            });
            if (adm === false) {

                return res.status(401).json({ message: "User is not adm" })
            }
            const { id } = req.params;
            await Connection('Address').where('id_users', id).del()
            await Connection("Users").where({ id }).del();
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};