var config = require("nconf");

config.argv()
    .file({
        file: 'config.json'
    });

var 
	db       = require('./core/db'),
	app      = require('./core/express'),
	passport = require('./core/passport'),
	http     = require('http').createServer(app),
	socket   = require('./core/socket')(http),
	port     = config.get("app:port") || 3000;


app.set('port', port);
http.listen(port);