const { getMaxListeners } = require('process');

const
    nodemailer = require('nodemailer'),
    myEmail = process.env.EMAIL,
    transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: process.env.USER,
            pass: process.env.PWD
        }
    });

module.exports.sendMessage = (req, res) => {

    let
        mailOptions,
        message = (req.body);

    console.log(message)

    if (message.copy) {
        mailOptions = {
            from: [message.address, { name: message.name, address: message.address }],
            to: myEmail,
            cc: message.address,
            subject: message.subject,
            html: '<p>' + message.text + '<br><br>' + message.text + '</p>'
        }
    } else {
        mailOptions = {
            from: [message.address, { name: message.name, address: message.address }],
            to: myEmail,
            subject: message.subject,
            html: '<p>' + message.text + '<br><br>' + message.name + '</p>'
        }
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({ status: false, message: `${error.message}; Server error, please try again later` });
        } else {
            const
                message = info.response,
                statusCode = parseInt(message.substr(0, 3)),
                status = statusCode == 250 ? true : false;

            res.status(statusCode).json({ status, message });
        }
    });

}