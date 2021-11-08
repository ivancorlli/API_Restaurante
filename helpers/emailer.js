const nodemailer = require('nodemailer');


function createTransporter(){
     const transport= nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "88c1da57826a75",
          pass: "c3cc0dfb2cee58"
        }
      });

    return transport
}

async function sendMail (data){
    const transport = createTransporter();
    const info = await transport.sendMail(data)
    return
}


module.exports = {
    sendMail,
}