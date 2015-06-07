var
  config   = require('nconf'),
  passport = require('passport'),
  User     = require('mongoose').model('user');


module.exports = function(req, res, next) {
    if (passport.checkInvite(req.body.invite)) {
        var user = new User({
            email: req.body.email,
            password: req.body.password
        });
        user.save(function(err) {
            return err ? next(err) : req.login(user, function(err) {
                return err ? next(err) : res.redirect('/admin/panel');
            });
        });
    }
};
