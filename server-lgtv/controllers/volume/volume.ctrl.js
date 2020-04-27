lgtv = require("lgtv");

module.exports = {
    setVolume: async (req, res, next) => {
        let vol = Number(req.params.vol)
        if (!vol) {
            return res.json(false);
        }
        try {
            return res.json(false);
        } catch (error) {
            return res.json(false);
        }
    },
}