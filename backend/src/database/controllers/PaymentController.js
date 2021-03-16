const { resolve } = require("path");
const exphbs = require("express-handlebars");
const hbs = require("nodemailer-express-handlebars");
const transport = require("../../config/email/email");

const createSplitTransaction = require("../../services/pagarme")
  .createSplitTransaction;

module.exports = {
  async create(req, res) {
    try {
      const data = req.body;
      const transaction = await createSplitTransaction(data);
      const viewPath = resolve(__dirname, "../../", "resources", "mail");
      const email = data.customer.email;
      const name = data.customer.name;

      transport.use(
        "compile",
        hbs({
          viewEngine: exphbs.create({
            layoutsDir: viewPath,
            defaultLayout: "purchaseFinish",

            extname: ".html",
          }),
          viewPath,
          extName: ".html",
        })
      );

      transport.sendMail(
        {
          to: email,
          from: "contato@Outlet.com.br",
          template: "purchaseFinish",
          subject: "Outlet - Compra aprovada",
          context: { email, name },
        },
        (error) => {
          if (error) {
            console.log(error);
            return res
              .status(400)
              .json({ message: "Cannot send purchase , try again" });
          }

          return res.json(transaction);
        }
      );
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  },
};
