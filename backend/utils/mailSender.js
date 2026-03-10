const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // verify connection with smtp server
    await transporter.verify();
    console.log("SMTP server connected");

    let info = await transporter.sendMail({
      from: `"ShaadiBio" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.response);

    return info;

  } catch (err) {
    console.log("Mail sending error:", err);
  }
};

module.exports = mailSender;