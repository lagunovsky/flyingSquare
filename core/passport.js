var
  config        = require('nconf');
  passport      = require('passport');
  LocalStrategy = require('passport-local').Strategy;
  mongoose      = require('mongoose');
  User          = mongoose.model('user');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
    User.findOne({
        email: username
    }, function(err, user) {
        return err ? done(err) : user ? user.checkPassword(password) ? done(null, user) : done(null, false, {
            message: 'Incorrect password.'
        }) : done(null, false, {
            message: 'Incorrect username.'
        });
    });
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        err
            ? done(err) : done(null, user);
    });
});

module.exports = passport;
