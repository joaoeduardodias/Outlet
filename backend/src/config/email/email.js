const nodemailer = require("nodemailer");

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

      extname: ".html",
    }),
    viewPath,
    extName: ".html",
  })
);
module.exports = transport;
