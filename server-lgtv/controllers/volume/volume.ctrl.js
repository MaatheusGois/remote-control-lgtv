lgtv = require("lgtv");

module.exports = {
    setVolume: async (req, res, next) => {
        let vol = Number(req.params.vol)
        if (!vol) {
            return res.json(false);
        }
        try {
            lgtv.set_volume(vol, function (err, response) {
                if (err) {
                    return res.json(false);
                } else {
                    return res.json(true);
                }
            });
        } catch (error) {
            return res.json(false);
        }
    },
    volumeUp: async (req, res, next) => {
        try {
            lgtv.input_volumeup(vol, function (err, response) {
                if (err) {
                    return res.json(false);
                } else {
                    return res.json(true);
                }
            });
        } catch (error) {
            return res.json(false);
        }
    },
}