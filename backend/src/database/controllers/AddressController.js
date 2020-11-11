const crypto = require("crypto");
const Connection = require("../../database");
const axios = require("axios");

module.exports = {
    async listState(req, res) {
        const data = await Connection("State").select("name", "id");
        res.json(data);
    },
    async listCity(re, res) {
        const { id } = req.params
        const data = await Connection('City').select('id', 'name').where('id_State', id)
        res.json(data)
    },
    async addstate(req, res) {
        const { data } = await axios.get(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        data.map(async(item) => {
            // let idState = item.id.toString();
            // await Connection("State").insert({
            //     id: idState,
            //     name: item.nome,
            //     id_country: "1",
            //     uf: item.sigla,
            // });
            const city = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${item.sigla}/municipios`)
            city.map(async(item) => {
                await Connection('City').insert({
                    id: item.id,
                    name: item.name,
                })
            })
        });
    },
    async addCity() {},
};