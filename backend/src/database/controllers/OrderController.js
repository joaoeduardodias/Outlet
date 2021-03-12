const Connection = require("../../database");
const { index } = require("./UploadController");

module.exports = {
  async index(req, res) {
    const data = await Connection("Orders");
    return res.json(data);
  },
  async create(req, res, next) {
    try {
      const { ...idsSold } = req.body;
      await Connection("Orders").insert({ ids_sold: idsSold });

      return res.json(idsSold);
    } catch (error) {
      // next(error)
      console.log(error);
      return res.status(500).json({ message: "Error" + error });
    }
  },
  async update(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  },
};
