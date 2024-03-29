const wol = require('wol');

module.exports = {
  isConnected: (req, res, next) => {
    res.json({
      success: !!global.globalLGTV
    })
  },
  async turnOn() {
    console.log('Turning on...');
    return new Promise((resolve, reject) => {
      wol.wake('MAC ADDRESS', {
        address: '192.168.18.3',
        port: 3000
      }, (error) => {
        if (error) return reject(error);
        console.log('Turned on');
        resolve();
      });
    });
  },
  connect: (req, res, next) => {
    try {
      var lgtv = require("../../lgtv")({
        url: "ws://192.168.100.68:3000",
      });

      lgtv.on("error", function (error) {
        lgtv.disconnect();
        return res.json({
          success: false,
          message: error.message,
        });
      });

      lgtv.on("connecting", function () {
        console.log("connecting...");
      });

      lgtv.on("connect", function () {
        global.globalLGTV = lgtv;
        return res.json({
          success: true,
        });
      });

      lgtv.on("prompt", function () {
        console.log("please authorize on TV");
      });

      lgtv.on("close", function () {
        return res.json({
          success: false,
          message: "close",
        });
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  },
  disconnect: (req, res, next) => {
    try {
      global.globalLGTV.disconnect();
      return res.json({
        success: true,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  },
};
