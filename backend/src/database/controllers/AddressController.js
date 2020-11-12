const Connection = require("../../database");
const axios = require("axios");

module.exports = {
    async listState(req, res) {
        const data = await Connection("State").select("name", "id");
        res.json(data);
    },
    async listCity(req, res) {
        const { id } = req.params
        const data = await Connection('City').select('id', 'name').where('id_State', id)
        res.json(data)
    },
    // async addstate(req, res) {
    //     // const { data } = await axios.get(
    //     //     "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    //     // );
    //     // data.map(async(item) => {
    //     //     let idState = item.id.toString();
    //     // await Connection("State").insert({
    //     //     id: idState,
    //     //     name: item.nome,
    //     //     id_country: "1",
    //     //     uf: item.sigla,
    //     // });
    //     const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/DF/municipios`)
    //     data.map(async(item) => {
    //             let idCity = item.id.toString()
    //             await Connection('City').insert({
    //                 id: idCity,
    //                 name: item.nome,
    //                 id_State: '53'

    //             })
    //         })
    //         // });
    //     return res.json({ message: 'finish' })
    // },
};