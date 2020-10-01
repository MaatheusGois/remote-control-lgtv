// // commands related to input such as remote control and text input
module.exports = {
  mouse: (req, res, next) => {
    try {
      if (global.isSend) {
        return res.json({
          success: false,
          message: "Aguarde o próximo comando...",
        });
      }
      global.isSend = true;

      const command = req.body.command;
      const payload = req.body.payload || {};
      if (!command) {
        return res.json({
          success: false,
          message: "Algo deu errado",
        });
      }
      if (!global || !global.globalLGTV.isConnected()) {
        return res.json({
          success: false,
          message: "Verifique se a televisão está ligade e conectada.",
        });
      }
      global.globalLGTV.getSocket(
        "ssap://com.webos.service.networkinput/getPointerInputSocket",
        function (error, sock) {
          if (error) {
            return res.json({
              success: false,
              message: error,
            });
          }
          sock.send(command, payload);
          global.isSend = false;
          return res.json({
            success: true,
          });
        }
      );
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  },
};
