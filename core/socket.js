var io = require('socket.io');

module.exports = function(http) {
    io = io(http);

    io.on('connection', function(socket) {

    });
};
