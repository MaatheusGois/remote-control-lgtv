const express = require('express')
const { commandsCtrl } = require('../../controllers')
const router = new express.Router()

router.get('/button/:command', commandsCtrl.button)
router.post('/channel', commandsCtrl.channel)

module.exports = router
