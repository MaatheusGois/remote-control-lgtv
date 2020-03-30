lgtv = require("lgtv");

module.exports = {
    connect: (req, res, next) => {
        try {
            var retry_timeout = 10;
            lgtv.discover_ip(retry_timeout, function (err, ipaddr) {
                if (err) {
                    return res.json('Failed to find TV IP address on the LAN. Verify that TV is on, and that you are on the same LAN/Wifi.');
                }
                lgtv.connect(ipaddr, function (err, response) {
                    if (err) {
                        return res.json(false);
                    }
                    let message = req.params.message || 'Conexão estabelecida!'
                    lgtv.show_float(message, function (err, response) {
                        if (err) {
                            console.log(response);
                            return res.json(false);
                        } else {
                            return res.json(true);
                        }
                    });
                });
            });
        } catch (error) {
            return res.json(error);
        }
    },
    disconnect: (req, res, next) => {
        try {
            lgtv.disconnect();
            return res.json(true);
        } catch (error) {
            console.log('here')
            return res.json(error);
        }
    },
}