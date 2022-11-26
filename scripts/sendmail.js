"use strict"

const nodemailer = require("nodemailer")
const pug = require('pug')

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email,
    this.from = user.from,
    this.firstname = user.firstname,
    this.url = url
  }

  transporter() {
    //for development only
    return nodemailer.createTransport(
      {
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "8c6eaf906bc876",
            pass: "4c20d76980f670"
          }
      }
    )
  }

  async send(template, subject) {   

    const html = pug.renderFile(`${__dirname}/../data/templates/${template}.pug`,{
      firstName: this.firstname,
      subject,
      link: this.url
    })

    // send mail with defined transport object
    let info;

    let newTransporter = this.transporter()

    try {
      info = await newTransporter.sendMail({
        from: this.from, // sender address
        to: "tech.swarns@gmail.com", // list of receivers
        subject: subject, // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
    })}catch(err){
      console.log(`send email error: ${err}`)
    }

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

}
