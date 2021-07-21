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

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).json({ status: false });
        } else {
            console.log('Email sent: ' + info.response);
            if (parseInt(info.response.substr(0, 3)) == 250) {
                res.status(250).json({ status: true });
            } else {
                res.status(500).json({ status: false });
            }
        }
    });

}