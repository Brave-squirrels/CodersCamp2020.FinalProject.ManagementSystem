import nodemailer from "nodemailer";
import "dotenv/config";

export default function sednEmail(email: string, url: string) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "management.system2021@gmail.com",
    to: email,
    subject: "Confirm Email",
    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) console.log("Error Occurs: ", err);
    else console.log("Email sent!!!");
  });
}
