/* eslint-disable node/no-deprecated-api */
/* eslint-disable camelcase */
/* eslint-disable standard/no-callback-literal */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// const find = require('local-devices')
// find().then(devices => {
//   console.log(devices)
// })

// for SSDP discover of TV on the LAN
var dgram = require('dgram')
// const lgtv = require('./lgtv')()

const retryTimeout = 10 // seconds

var _send_ssdp_discover = function (socket) {
  var ssdp_rhost = '239.255.255.250'
  var ssdp_rport = 1900

  // these fields are all required
  var ssdp_msg = 'M-SEARCH * HTTP/1.1\r\n'
  ssdp_msg += 'HOST: 239.255.255.250:1900\r\n'
  ssdp_msg += 'MAN: "ssdp:discover"\r\n'
  ssdp_msg += 'MX: 5\r\n'
  ssdp_msg += 'ST: urn:dial-multiscreen-org:service:dial:1\r\n'
  ssdp_msg += 'USER-AGENT: iOS/5.0 UDAP/2.0 iPhone/4\r\n\r\n'
  var message = Buffer.from(ssdp_msg)

  socket.send(message, 0, message.length, ssdp_rport, ssdp_rhost, function (err, bytes) {
    if (err) throw err
    // console.log('SSDP message sent to ' + ssdp_rhost +':'+ ssdp_rport);
    // console.log(message.toString());
  })
}
/* --------------------------------------------------------------------------- */
var discover_ip = function (retry_timeout_seconds, tv_ip_found_callback) {
  var server = dgram.createSocket('udp4')
  var timeout = 0
  var cb = tv_ip_found_callback || undefined

  // sanitize parameters and set default otherwise
  if (retry_timeout_seconds && typeof (retry_timeout_seconds) === 'number') {
    timeout = retry_timeout_seconds
  } else if (!tv_ip_found_callback && typeof (retry_timeout_seconds) === 'function') {
    // overloading, the first parameter was not a timeout, but the callback
    // and we thus assume no timeout is given
    cb = retry_timeout_seconds
  }

  // when server has opened, send a SSDP discover message
  server.on('listening', function () {
    _send_ssdp_discover(server)

    // retry automatically if set
    if (timeout > 0) {
      // set timeout before next probe
      // XXXXX
      // after timeout seconds, invoke callback indicating failure
      cb(true, 'error')
    }
  })

  // scan incoming messages for the magic string, close when we've got it
  server.on('message', function (message, remote) {
    if (message.indexOf('LG Smart TV') >= 0) {
      server.close()
      if (cb) {
        cb(false, remote.address)
      }
    }
  })

  server.bind() // listen to 0.0.0.0:random
  return server
}
discover_ip(retryTimeout, function (err, ipaddr) {
  if (err) {
    console.log('Failed to find TV IP address on the LAN. Verify that TV is on, and that you are on the same LAN/Wifi.')
  } else {
    console.log('TV ip addr is: ' + ipaddr)
  }
})

// lgtv.on('error', function (err) {
//   console.log(err)
// })

// lgtv.on('connecting', function () {
//   console.log('connecting')
// })

// lgtv.on('connect', function () {
//   console.log('connected')
//   lgtv.getSocket(
//     'ssap://com.webos.service.networkinput/getPointerInputSocket',
//     function (err, sock) {
//       if (!err) {
//         sock.send('button', { name: 'UP' })
//       }
//     }
//   )
// // lgtv.request('ssap://media.controls', "type:button\nname:UP\n\n", function (err, res) {
// //     console.log(res)
// // });
// })

// lgtv.on('prompt', function () {
//   console.log('please authorize on TV')
// })

// lgtv.on('close', function () {
//   console.log('close')
// })
