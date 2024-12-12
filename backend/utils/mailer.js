import nodemailer from "nodemailer";
import dotenv from "dotenv";
// require ('dotenv').config()

dotenv.config();
const PASSWORD = process.env.PASSWORD
const HOST_EMAIL = process.env.HOST_EMAIL
const SENDER_MAIL = process.env.SENDER_MAIL

const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: SENDER_MAIL,
    pass: PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (to, subject, html) => {

  const mailOptions = {
    from: SENDER_MAIL,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default sendEmail;