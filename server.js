const express = require('express');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;
const mailerHost = process.env.HOST;
const mailerUser = process.env.USER;
const mailerPwd = process.env.PWD
const myEmail = process.env.EMAIL;

io.set("transports", ["websocket"]);

app.use(express.static(path.join(__dirname, 'public/client')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/client/index.html'));
});

let transporter = nodemailer.createTransport({
    host: mailerHost,
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: mailerUser,
        pass: mailerPwd
    }
})

io.on('connection', (client) => {
    console.log('user connected');
    client.emit('connectStatus', 'server connected');
    client.on('new-message', (email) => {
        message = JSON.parse(email);
        let mailOptions;
        if (message.jsonCopy === true) {
            mailOptions = {
                from: [message.jsonAddress, { name: message.jsonName, address: message.jsonAddress }],
                to: myEmail,
                cc: message.jsonAddress,
                subject: message.jsonSubject,
                html: '<p>' + message.jsonText + '<br><br>' + message.jsonName + '</p>'
            }
        } else {
            mailOptions = {
                from: [message.jsonAddress, { name: message.jsonName, address: message.jsonAddress }],
                to: myEmail,
                subject: message.jsonSubject,
                html: '<p>' + message.jsonText + '<br><br>' + message.jsonName + '</p>'
            }
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                client.emit('messageStatus', false);
            } else {
                console.log('Email sent: ' + info.response);
                if (parseInt(info.response.substr(0, 3)) == 250) {
                    client.emit('messageStatus', true);
                } else {
                    client.emit('messageStatus', false);
                }
            }
        });
    });
});

server.listen(port, () => console.log(`Listening on ${port}`));
