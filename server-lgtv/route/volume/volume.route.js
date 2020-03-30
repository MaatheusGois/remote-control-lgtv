const express = require('express');
const {volumeCtrl} = require('../../controllers');
const router = new express.Router();

router.get('/setVolume/:vol', volumeCtrl.setVolume);

module.exports = router;
