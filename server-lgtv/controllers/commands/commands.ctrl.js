// // commands related to input such as remote control and text input
lgtv = require("lgtv");

module.exports = {
    // input_enter; /* remote control 'enter' */
    // input_pause; /* remote control 'pause' */
    // input_play; /* remote control 'play' */
    // input_stop; /* remote control 'stop' */
    // input_volumeup; /* remote control 'volume up' */
    // input_volumedown; /* remote control 'volume down' */
    // input_channel_up; /* remote control volume up */
    // input_channel_down; /* remote control volume down */
    // input_media_play; /* remote control play */
    // input_media_stop; /* remote control stop */
    // input_media_pause; /* remote control pause */
    // input_media_rewind; /* remote control rewind */
    // input_media_forward; /* remote control forward */
    // input_three_d_on; /* remote control 3d on */
    // input_three_d_off; /* remote control 3d off */
    // input_backspace; /* send 'backspace' */
    // input_text; /* insert text */
    // input_pointer_connect; /* get pointer (like mouse pointer) */
    // input_pointer_scroll; /* scroll */
    // input_pointer_move; /* move the pointer */
    // input_pointer_click; /* click pointer */
    // input_pointer_disconnect; /* disconnect the pointer */
    commandWithoutIntup: (req, res, next) => {
        try {
            let command = req.params.command
            if(!command) {
                return res.json({
                    success: false,
                    message: 'command is required'
                });
            }
            if(!lgtv.connected()) {
                return res.json({
                    success: false,
                    message: 'tv not stay cconnected'
                });
            }
            
            lgtv[command](function (err, response) {
                if (err) {
                    return res.json({
                        success: false,
                        message: response
                    });
                } 
                return res.json({
                    success: true,
                    content: response
                });
            });
        } catch (error) {
            return res.json({
                success: false,
                message: error
            });
        }
    },
}