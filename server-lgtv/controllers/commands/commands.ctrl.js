// // commands related to input such as remote control and text input
module.exports = {
    commandWithoutIntup: (req, res, next) => {
        try {
            let command = req.params.command
            if(!command) {
                return res.json({
                    success: false,
                    message: 'command is required'
                });
            }
            if(!global.globalLGTV.isConnected()) {
                return res.json({
                    success: false,
                    message: 'tv not stay cconnected'
                });
            }
            global.globalLGTV.getSocket(
                'ssap://com.webos.service.networkinput/getPointerInputSocket',
                function(error, sock) {
                    if (error) {
                        return res.json({
                            success: false,
                            message: error
                        });
                    }
                    sock.send('button', {name: command.toUpperCase()});
                    return res.json({
                        success: true
                    });
                }
            );
        } catch (error) {
            return res.json({
                success: false,
                message: error.message
            });
        }
    },
    // input_text; /* insert text */
    // input_pointer_connect; /* get pointer (like mouse pointer) */
    // input_pointer_scroll; /* scroll */
    // input_pointer_move; /* move the pointer */
    // input_pointer_click; /* click pointer */
    // input_pointer_disconnect; /* disconnect the pointer */
}