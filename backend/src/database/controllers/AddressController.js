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
        const { data: data1 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/13/municipios`
        );
        data1.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '13'

                })
            })
            // muda estado

        // CIDADE
        const { data: data2 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/14/municipios`
        );
        data2.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '14'

                })
            })
            // muda estado

        // CIDADE
        const { data: data3 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/12/municipios`
        );
        data3.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '12'

                })
            })
            // muda estado

        // CIDADE
        const { data: data4 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/17/municipios`
        );
        data4.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '17'

                })
            })
            // muda estado

        // CIDADE
        const { data: data5 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/15/municipios`
        );
        data5.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '15'

                })
            })
            // muda estado

        // CIDADE
        const { data: data6 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/21/municipios`
        );
        data6.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '21'

                })
            })
            // muda estado

        // CIDADE
        const { data: data7 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/16/municipios`
        );
        data7.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '16'

                })
            })
            // muda estado

        // CIDADE
        const { data: data8 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/22/municipios`
        );
        data8.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '22'

                })
            })
            // muda estado

        // CIDADE
        const { data: data9 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/25/municipios`
        );
        data9.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '25'

                })
            })
            // muda estado

        // CIDADE
        const { data: data10 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/24/municipios`
        );
        data10.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '24'

                })
            })
            // muda estado

        // CIDADE
        const { data: data11 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/26/municipios`
        );
        data11.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '26'

                })
            })
            // muda estado

        // CIDADE
        const { data: data12 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios`
        );
        data12.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '23'

                })
            })
            // muda estado

        // CIDADE
        const { data: data13 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/27/municipios`
        );
        data13.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '27'

                })
            })
            // muda estado

        // CIDADE
        const { data: data14 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/28/municipios`
        );
        data14.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '28'

                })
            })
            // muda estado

        // CIDADE
        const { data: data15 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/29/municipios`
        );
        data15.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '29'

                })
            })
            // muda estado

        // CIDADE
        const { data: data16 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/municipios`
        );
        data16.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '31'

                })
            })
            // muda estado

        // CIDADE
        const { data: data17 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/32/municipios`
        );
        data17.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '32'

                })
            })
            // muda estado

        // CIDADE
        const { data: data18 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`
        );
        data18.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '33'

                })
            })
            // muda estado

        // CIDADE
        const { data: data19 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/41/municipios`
        );
        data19.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '41'

                })
            })
            // muda estado

        // CIDADE
        const { data: data20 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/42/municipios`
        );
        data20.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '42'

                })
            })
            // muda estado

        // CIDADE
        const { data: data21 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/43/municipios`
        );
        data21.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '43'

                })
            })
            // muda estado


        // CIDADE
        const { data: data22 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios`
        );
        data22.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '35'

                })
            })
            // muda estado

        // CIDADE
        const { data: data23 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/50/municipios`
        );
        data23.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '50'

                })
            })
            // muda estado

        // CIDADE
        const { data: data24 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/51/municipios`
        );
        data24.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '51'

                })
            })
            // muda estado

        // CIDADE
        const { data: data25 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/53/municipios`
        );
        data25.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '53'

                })
            })
            // muda estado

        // CIDADE
        const { data: data26 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/52/municipios`
        );
        data26.map(async(item) => {
                let idCity = item.id.toString()
                await Connection('City').insert({
                    id: idCity,
                    name: item.nome,
                    id_State: '52'

                })
            })
            // muda estado

        // CIDADE
        const { data: data27 } = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/DF/municipios`
        );
        data27.map(async(item) => {
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