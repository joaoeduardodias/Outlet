const nodemailer = require("nodemailer");
const viewPath = resolve(__dirname, "../../", "resources", "mail");
const exphbs = require("express-handlebars");
const hbs = require("nodemailer-express-handlebars");
const transport = require("../../config/email/email");
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: exphbs.create({
      layoutsDir: viewPath,
      defaultLayout: "forgotpassword",

      extname: ".html",
    }),
    viewPath,
    extName: ".html",
  })
);
module.exports = transport;
