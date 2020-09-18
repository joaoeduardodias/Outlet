const crypto = require("crypto");
const knex = require("../../database");
const Connection = require("../../database");

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
                password,
                whatsapp,
                cpf,
                date_birth,
                administrador,
            } = req.body;
            const id = crypto.randomBytes(3).toString("HEX");

            await Connection("Users").insert({
                id,
                name,
                email,
                password,
                whatsapp,
                cpf,
                date_birth,
                administrador,
            });

            return res.status(201).json({ id });
        } catch (error) {
            next(error)
        }

    },
    async update(req, res, next) {
        try {
            const {
                name,
                email,
                password,
                whatsapp,
                cpf,
                date_birth,
                administrador
            } = req.body
            const { id } = req.params
            await Connection('Users').update({
                name,
                email,
                password,
                whatsapp,
                cpf,
                date_birth,
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
            return res.send()
        } catch (error) {
            next(error)
        }
    }
}