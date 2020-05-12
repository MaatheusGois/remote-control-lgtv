module.exports = {
  connect: (req, res, next) => {
    try {
      var lgtv = require('../../lgtv')({
        url: 'ws://lgwebostv:3000'
      })

      lgtv.on('error', function (error) {
        lgtv.disconnect()
        return res.json({
          success: false,
          message: error.message
        })
      })

      lgtv.on('connecting', function () {
        console.log('connecting...')
      })

      lgtv.on('connect', function () {
        global.globalLGTV = lgtv
        return res.json({
          success: true
        })
      })

      lgtv.on('prompt', function () {
        console.log('please authorize on TV')
      })

      lgtv.on('close', function () {
        return res.json({
          success: false,
          message: 'close'
        })
      })
    } catch (error) {
      return res.json({
        success: false,
        message: error.message
      })
    }
  },
  disconnect: (req, res, next) => {
    try {
      global.globalLGTV.disconnect()
      return res.json({
        success: true
      })
    } catch (error) {
      return res.json({
        success: false,
        message: error.message
      })
    }
  }
}
