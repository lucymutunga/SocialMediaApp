const { createTransport } = require("nodemailer");
require("dotenv").config();
const email_config = require("../config/emailConfig");

const transporter = createTransport(email_config);

async function sendMail(user) {
  try {
    const message_options = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Welcome to Tujuane Media App",
      html: `<h1>Hi ${user.username}</h1>
        <p>Thank you for registering with us</p>
        <p>Click <a href="http://localhost:3030/login">here</a> to login</p>
        <p>Regards</p>
        <p>Tujuane Media Team</p>`,
    };

    let info = await transporter.sendMail(message_options);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMail };
