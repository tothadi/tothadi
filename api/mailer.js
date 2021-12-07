const
    nodemailer = require('nodemailer'),
    myEmail = process.env.EMAIL,
    transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        secure: true, // upgrade later with STARTTLS
        requireTLS: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PWD
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

module.exports.sendMessage = (req, res) => {

    let
        message = req.body,
        mailOptions = {
            from: [message.address, { name: message.name, address: message.address }],
            to: myEmail,
            subject: message.subject,
            html: '<p>' + message.text + '<br><br>' + message.name + '</p>'
        };

    if (message.copy) {
        mailOptions = { ...mailOptions, cc: message.address }
    };

    console.log(mailOptions)

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