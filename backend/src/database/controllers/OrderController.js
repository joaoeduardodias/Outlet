const Connection = require("../../database");
const crypto = require("crypto");
module.exports = {
  async index(req, res) {
    const data = await Connection("Orders").select("id_order", "ids_sold");
    return res.json(data);
  },
  async create(req, res, next) {
    try {
      const id_order = crypto.randomBytes(3).toString("HEX");
      const id_client = req.params;

      const { ...products } = req.body;
      await Connection("Orders").insert({
        id_order,
        id_client,

        products,
      });
      return res.json({ message: "created" });
    } catch (error) {
      // next(error)
      console.log(error);
      return res.status(500).json({ message: "Error" + error });
    }
  },
  //   async update(req, res, next) {
  //     try {
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
  //   async delete(req, res, next) {
  //     try {
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
};
