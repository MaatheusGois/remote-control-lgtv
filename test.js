var lgtv = require('./lgtv')({
  url: 'ws://lgwebostv:3000'
})

lgtv.on('error', function (err) {
  console.log(err)
})

lgtv.on('connecting', function () {
  console.log('connecting')
})

lgtv.on('connect', function () {
  console.log('connected')
  lgtv.getSocket(
    'ssap://com.webos.service.networkinput/getPointerInputSocket',
    function (err, sock) {
      if (!err) {
        sock.send('button', { name: 'UP' })
      }
    }
  )
  // lgtv.request('ssap://media.controls', "type:button\nname:UP\n\n", function (err, res) {
  //     console.log(res)
  // });
})

lgtv.on('prompt', function () {
  console.log('please authorize on TV')
})

lgtv.on('close', function () {
  console.log('close')
})
