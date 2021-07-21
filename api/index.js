const express = require('express'),
    router = express.Router(),
    ctrlMessage = require('./mailer');

router.post('/message', ctrlMessage.sendMessage)

module.exports = router
