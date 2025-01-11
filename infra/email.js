const nodemailer = require("nodemailer")
require("dotenv").config()


const transporter = nodemailer.createTransport({
  host: "smtp.mailosaur.net",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  }
})

module.exports = transporter