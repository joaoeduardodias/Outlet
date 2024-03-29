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
      .select("id", "nameCity")
      .where("id_State", id);
    res.json(data);
  },
  async addstate(req, res) {
    const { data } = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    // await Connection("Country").insert({
    //     id: "1",
    //     name: "Brasil"
    // })
    data.map(async (item) => {
      let idState = item.id.toString();

      // await Connection("State").insert({
      //         id: idState,
      //         name: item.nome,
      //         id_country: "1",
      //         uf: item.sigla,
      //     })
      // CIDADE

      addcity(idState);

      // TERMINA A CIDADE
    });

    async function addcity(state_id) {
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state_id}/municipios`
      );
      data.map(async (item) => {
        let idCity = item.id.toString();
        await Connection("City").insert({
          id: idCity,
          nameCity: item.nome,
          id_State: state_id,
        });
      });
    }
    return res.json({ message: "finish" });
  },
  async create(req, res, next) {
    try {
      const {
        street,
        neighborhood,
        number,
        zip_code,
        id_city,
        id_users,
      } = req.body;

      const id = crypto.randomBytes(3).toString("HEX");
      await Connection("Address").insert({
        id,
        street,
        neighborhood,
        number,
        zip_code,
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
        .join("State", "State.id", "=", "City.id_State")
        .select(
          "Address.id",
          "Address.street",
          "Address.neighborhood",
          "Address.number",
          "Address.zip_code",
          "City.nameCity",
          "State.uf"
        );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Connection("Address")
        .join("City", "Address.id_city", "=", "City.id")
        .join("State", "State.id", "=", "City.id_State")
        .select(
          "Address.id",
          "Address.street",
          "Address.neighborhood",
          "Address.number",
          "Address.zip_code",
          "City.nameCity",
          "State.uf"
        )
        .where("id_users", id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Connection("Address").where({ id }).del();
      return res.json({ message: "success" });
    } catch (error) {
      next(error);
    }
  },
};
