const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {

    const transport = nodeMailer.createTransport({
        host:'smtp.gmail.com',port:465,   // optional
        service:  process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,  // directly google not allow us to use password directly to any app so
            // first create app password by following steps and use it here 16 digit password without space
            // 1- turn on 2 step verification 
            // 2- generate |"app password and use it"
        }
    })

    const mailOptions = {
        from:  process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }


    await transport.sendMail(mailOptions);
}



module.exports = sendEmail; 