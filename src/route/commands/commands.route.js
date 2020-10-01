const express = require("express");
const { commandsCtrl, mouseCtrl } = require("../../controllers");
const router = new express.Router();

router.get("/button/:command", commandsCtrl.button);
router.post("/channel", commandsCtrl.channel);
router.post("/mouse", mouseCtrl.mouse);
router.get("/test", commandsCtrl.channel);

module.exports = router;
