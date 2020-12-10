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
        // const { data } = await axios.get(
        //     "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        // );

        // await Connection("Country").insert({
        //     id: "1",
        //     name: "Brasil"
        // })
        // data.map(async(item) => {
        //     let idState = item.id.toString();

        // await Connection("State").insert({
        //         id: idState,
        //         name: item.nome,
        //         id_country: "1",
        //         uf: item.sigla,
        //     })
        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/11/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '11'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/13/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '13'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/14/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '14'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/12/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '12'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/17/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '17'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/15/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '15'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/21/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '21'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/16/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '16'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/22/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '22'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/25/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '25'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/24/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '24'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/26/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '26'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '23'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/27/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '27'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/28/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '28'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/29/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '29'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '31'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/32/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '32'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '33'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/41/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '41'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/42/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '42'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/43/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '43'

                })
            })
            // muda estado


        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '35'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/50/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '50'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/51/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '51'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/53/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '53'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/52/municipios`
        );
        data.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '52'

                })
            })
            // muda estado

        // CIDADE
        const { data } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/DF/municipios`
        );
        data.map(async(item) => {
            let idCity = item.id.toString()
            await Connection('City').insert({
                id: idCity,
                name: item.nome,
                id_State: '53'

            })
        })



        // TERMINA A CIDADE
        // });
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