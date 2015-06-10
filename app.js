var config = require("nconf").argv().file({file: 'config.json'});

var
  app = require('./core/express'),
  server = require('http').createServer(app),
  game = require('./core/game'),
  gameManager = require('./core/gameManager')(server,game),
  debug = require('debug')('http');
port = config.get("app:port") || 3000;

app.set('port', port);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
