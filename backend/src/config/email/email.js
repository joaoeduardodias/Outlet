const nodemailer = require("nodemailer");
const { resolve } = require("path");
const exphbs = require("express-handlebars");
const hbs = require("nodemailer-express-handlebars");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = transport;
