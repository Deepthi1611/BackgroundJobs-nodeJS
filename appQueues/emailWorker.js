const models = require('../models')
//import nodemailer
const nodemailer = require('nodemailer')

//create connection to smtp
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD // app password
    }
  })

//defining emailworker
const emailWorker = async(job, done) => {
    let data = job.data
    let mailOptions = {
        from: process.env.EMAIL,
        to: data.email,
        subject: data.subject,
        text: data.text
      };
      //send email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    done(null,{success:true})
}

module.exports = emailWorker