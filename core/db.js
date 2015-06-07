var
	config      = require("nconf");
	mongoose    = require('mongoose');
	requireTree = require('require-tree');
	models      = requireTree('../sheme/');


module.exports = mongoose.connect(config.get('db'));