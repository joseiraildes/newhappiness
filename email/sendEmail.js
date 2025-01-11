const transporter = require("../infra/email.js")

require("dotenv").config()


//new user registration success
const mailOptions = {
  from: process.env.USER_EMAIL,
  to: "user@example.com",
  subject: "Registration Successful",
  text: "Welcome to our platform! You have successfully registered."
}

async function sendEmail(to, replyTo, subject, html){
  const mail = {
    from: process.env.USER_EMAIL,
    to,
    replyTo,
    subject,
    html
  }

  const send = await transporter.sendMail(mail)
  console.log("Email sent: ", send.messageId)
}

module.exports = sendEmail