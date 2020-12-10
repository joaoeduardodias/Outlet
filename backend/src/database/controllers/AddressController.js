const Connection = require("../../database");
const axios = require("axios");
const crypto = require("crypto");
module.exports = {
    async listState(req, res) {
        const data = await Connection("State").select("name", "id");
        res.json(data);
    },
    async listCity(req, res) {
        const { id } = req.params;
        const data = await Connection("City")
            .select("id", "name")
            .where("id_State", id);
        res.json(data);
    },
    async addstate(req, res) {
        const { data } = await axios.get(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        data.map(async(item) => {
            let idState = item.id.toString();
            await Connection("State").insert({
                    id: idState,
                    name: item.nome,
                    id_country: "1",
                    uf: item.sigla,
                })
                // const { data } = await axios.get(
                //     `https://servicodados.ibge.gov.br/api/v1/localidades/estados/DF/municipios`
                // );
                // data.map(async(item) => {
                //     let idCity = item.id.toString()
                //     await Connection('City').insert({
                //         id: idCity,
                //         name: item.nome,
                //         id_State: '53'

            //     })
            // })
        });
        return res.json({ message: "finish" });
    },
    async create(req, res, next) {
        try {
            const { zip_code } = req.body
            await Connection('City').insert({ zip_code })

            const {
                name,
                neighborhood,
                number,
                id_city,
                id_users,
            } = req.body;
            const id = crypto.randomBytes(3).toString("HEX");
            await Connection("Address").insert({
                id,
                name,
                neighborhood,
                number,
                id_city,
                id_users,
            });
            return res.status(201).json({ message: "create" });
        } catch (error) {
            next(error);
        }
    },
    async index(req, res, next) {
        try {
            const data = await Connection("Address")
                .join("City", "Address.id_city", "=", "City.id")
                .select(
                    "Address.id",
                    "Address.name",
                    "Address.neighborhood",
                    "Address.number",
                    "City.name",
                    "City.zip_code"
                );
            return res.json(data);
        } catch (error) {
            next(error);
        }
    },
    async show(req, res, next) {
        try {
            const { id } = req.params
            const data = await Connection('Address')
                .join("City", "Address.id_city", "=", "City.id")
                .select(
                    "Address.id",
                    "Address.name",
                    "Address.neighborhood",
                    "Address.number",
                    "City.name",
                    "City.zip_code"
                ).where('id_users', id)
            return res.json(data)
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Connection('Address').where({ id }).del()
            return res.json({ message: 'success' })
        } catch (error) {
            next(error)
        }
    },
};