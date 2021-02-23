import nodemailer from "nodemailer";
import "dotenv/config";

export default async function sednEmail(email: string, url: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    service: "yahoo",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    debug: false,
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Confirm Email",
    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) console.log("Error Occurs: ", err);
    else console.log("Email sent!!!");
  });
}
