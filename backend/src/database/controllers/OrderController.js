const Connection = require("../../database");

module.exports = {
  async create(req, res, next) {
    try {
      const { idsSold } = req.body;
      console.log("id Venda  " + idsSold);
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
