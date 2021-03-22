const Connection = require("../../database");
const crypto = require("crypto");
const transport = require("../../config/email/email");

module.exports = {
  async index_send(req, res) {
    const data = await Connection("Orders")
      .select(
        "id_order",
        "id_client",
        "Users.name",
        "Users.email",
        "Users.whatsapp",
        "Address.street",
        "Address.neighborhood",
        "Address.number",
        "Address.zip_code",
        "Address.id_city",
        "City.nameCity",
        "value",
        "products"
      )
      .join("Users", "Users.id", "Orders.id_client")
      .join("Address", "Address.id_users", "Users.id")
      .join("City", "City.id", "Address.id_city")
      .where("send", true);
    return res.json(data);
  },
  async index(req, res) {
    const data = await Connection("Orders")
      .select(
        "id_order",
        "id_client",
        "Users.name",
        "Users.email",
        "Users.whatsapp",
        "Address.street",
        "Address.neighborhood",
        "Address.number",
        "Address.zip_code",
        "Address.id_city",
        "City.nameCity",
        "value",
        "products"
      )
      .join("Users", "Users.id", "Orders.id_client")
      .join("Address", "Address.id_users", "Users.id")
      .join("City", "City.id", "Address.id_city")
      .where("send", false);
    return res.json(data);
  },
  async create(req, res, next) {
    try {
      const id_order = crypto.randomBytes(3).toString("HEX");
      const { id } = req.params;

      const { value, ...products } = req.body;
      await Connection("Orders").insert({
        id_order,
        id_client: id,
        products,
        value,
      });
      return res.status(201).json({ message: "created" });
    } catch (error) {
      // next(error)
      console.log(error);
      return res.status(500).json({ message: "Error" });
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { email, name } = await Connection("Orders")
        .select("Users.email", "Users.name")
        .leftJoin("Users", "Users.id", "Orders.id_client")
        .where("id_order", id)
        .first();

      const { send, tracking } = req.body;
      await Connection("Orders")
        .update({
          send,
          tracking,
        })
        .where("id_order", id);

      // enviar email contendo o código de rastreio

      transport.sendMail(
        {
          to: email,
          from: "contato@Outlet.com.br",
          template: "sendOrder",
          subject: "Outlet - Código de rastreio",
          context: { email, tracking, name },
        },
        (error) => {
          if (error) {
            console.log(error);
            return res
              .status(400)
              .json({ message: "Cannot send code tracking, try again" });
          }
          return res.json({ message: "updated" });
        }
      );
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
