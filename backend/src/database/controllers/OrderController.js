const Connection = require("../../database");
const crypto = require("crypto");
module.exports = {
  async index(req, res) {
    const data = await Connection("Orders")
      .select("id_order", "id_client", "products")
      .where("send", false);
    return res.json(data);
  },
  async create(req, res, next) {
    try {
      const id_order = crypto.randomBytes(3).toString("HEX");
      const { id } = req.params;

      const { ...products } = req.body;
      await Connection("Orders").insert({
        id_order,
        id_client: id,
        products,
      });
      return res.status(201).json({ message: "created" });
    } catch (error) {
      // next(error)
      console.log(error);
      return res.status(500).json({ message: "Error" + error });
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;

      const { send, tracking } = req.body;
      await Connection("Orders")
        .update({
          send,
          tracking,
        })
        .where("id_order", id);
      return res.json({ message: "updated" });
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Connection("Order").where("id_sold", id).del();
    } catch (error) {
      next(error);
    }
  },
};
