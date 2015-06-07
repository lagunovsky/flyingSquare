var config = require('nconf');

module.exports = function(path) {
    return function(req, res) {
        res.redirect(path);
    };
};
