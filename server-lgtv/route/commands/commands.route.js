const express = require('express');
const {commandsCtrl} = require('../../controllers');
const router = new express.Router();

router.get('/command/:command', commandsCtrl.commandWithoutIntup);

module.exports = router;
