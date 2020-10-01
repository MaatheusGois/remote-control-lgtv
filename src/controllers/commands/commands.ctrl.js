// // commands related to input such as remote control and text input
module.exports = {
  button: (req, res, next) => {
    try {
      const command = req.params.command
      if (!command) {
        return res.json({
          success: false,
          message: 'Algo deu errado.'
        })
      }
      if (!global.globalLGTV || !global.globalLGTV.isConnected()) {
        return res.json({
          success: false,
          message: "Verifique se a televisão está ligade e conectada.",
        });
      }
      global.globalLGTV.getSocket(
        'ssap://com.webos.service.networkinput/getPointerInputSocket',
        async function (error, sock) {
          if (error) {
            return res.json({
              success: false,
              message: error
            })
          }
          sock.send('button', { name: command.toUpperCase() })
          return res.json({
            success: true
          })
        }
      )
    } catch (error) {
      return res.json({
        success: false,
        message: error.message
      })
    }
  },
  channel: (req, res, next) => {
    try {
      const command = req.body.command
      const value = req.body.value || {}

      if (!command) {
        return res.json({
          success: false,
          message: 'Algo deu errado.'
        })
      }
      if (!global.globalLGTV || !global.globalLGTV.isConnected()) {
        return res.json({
          success: false,
          message: "Verifique se a televisão está ligade e conectada.",
        });
      }
      global.globalLGTV.request(command, value, function (err, response) {
        if (err) {
          return res.json({
            success: false,
            message: err.message
          })
        }
        return res.json({
          success: true,
          message: response
        })
      })
    } catch (error) {
      return res.json({
        success: false,
        message: error.message
      })
    }
  },

  mute: (req, res, next) => {
    try {
      const command = req.body.command
      const value = req.body.value || {}

      if (!command) {
        return res.json({
          success: false,
          message: 'Algo deu errado.'
        })
      }
      if (!global.globalLGTV || !global.globalLGTV.isConnected()) {
        return res.json({
          success: false,
          message: "Verifique se a televisão está ligade e conectada.",
        });
      }
      global.globalLGTV.request(command, value, function (err, response) {
        if (err) {
          return res.json({
            success: false,
            message: err.message
          })
        }
        return res.json({
          success: true,
          message: response
        })
      })
    } catch (error) {
      return res.json({
        success: false,
        message: error.message
      })
    }
  }
}
