const nodemailer = require("nodemailer");

const exphbs = require("express-handlebars");
const hbs = require("nodemailer-express-handlebars");
const { resolve } = require("path");
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
const viewPath = resolve(__dirname, "../../", "resources", "mail");
transport.use(
  "compile",
  hbs({
    viewEngine: exphbs.create({
      layoutsDir: viewPath,
      defaultLayout: "",

      extName: ".html",
    }),
    viewPath,
    extName: ".html",
  })
);
module.exports = transport;
