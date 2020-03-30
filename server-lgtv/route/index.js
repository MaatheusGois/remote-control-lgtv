const commandsRouter = require('./commands/commands.route');
const powerRouter = require('./power/power.route');
const volumeRouter = require('./volume/volume.route');

module.exports = {
    commandsRouter,
    powerRouter,
    volumeRouter,
};
