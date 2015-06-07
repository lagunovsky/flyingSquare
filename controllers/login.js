var passport = require('passport');

module.exports = function(req, res, next) {
    passport.authenticate('local',
        function(err, user, info) {
            return err ? next(err) : user ? req.logIn(user, function(err) {
                return err ? next(err) : res.redirect('/admin/panel');
            }) : res.redirect('/admin');
        }
    )(req, res, next);
};
