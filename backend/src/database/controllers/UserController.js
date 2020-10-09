const crypto = require("crypto");
const Connection = require("../../database");
const bcrypt = require('bcrypt')

module.exports = {

    async index(next, res) {
        try {
            const users = await Connection("Users");
            return res.json(users)
        } catch (error) {
            next(error)
        }
    },

    async create(req, res, next) {


        try {
            const {
                name,
                email,
                whatsapp,


            } = req.body;
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
            next(error)
        }

    },
    async update(req, res, next) {
        try {
            const {
                name,
                email,
                whatsapp,
                administrador
            } = req.body
            const password = await bcrypt.hash(req.body.password, 5);

            const { id } = req.params
            await Connection('Users').update({
                name,
                email,
                password,
                whatsapp,
                administrador

            }).where({ id })

            return res.send()

        } catch (error) {
            next(error)
        }

    },

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Connection('Users').where({ id }).del()
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}