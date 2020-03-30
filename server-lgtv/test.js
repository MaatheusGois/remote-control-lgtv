lgtv = require("lgtv");


function test() {
    return new Promise((resolve, reject) => {
        var retry_timeout = 10; // seconds
        lgtv.discover_ip(retry_timeout, function (err, ipaddr) {
            if (err) {
                reject('Failed to find TV IP address on the LAN. Verify that TV is on, and that you are on the same LAN/Wifi.');
            } 
            lgtv.connect(ipaddr, function (err, response) {
                if (err) {
                    reject(err);
                }
                lgtv['show_float']('Conexão estabelecida!', function (err, response) {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
            });
        }); 
    })
}

test()
