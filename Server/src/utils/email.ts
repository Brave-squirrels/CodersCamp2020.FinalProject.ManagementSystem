const nodemailer = require('nodemailer');
require('dotenv').config();

function sednEmail(email, url) {
  // --------- Mail settings----------------------
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // TODO: your gmail account
      pass: process.env.PASSWORD
    }
  });

  // send email -----------------
  let mailOptions = {
    from: 'task.wars12@gmail.com',
    to: email,
    subject: 'Confirm Email',
    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error Occurs: ', err);
    } else {
      console.log('Email sent!!!');
    }
  });
}

exports.sednEmail = sednEmail;