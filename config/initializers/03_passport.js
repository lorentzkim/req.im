var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../../app/models/user');

module.exports = function() {
  passport.use(new LocalStrategy({ usernameField: 'username' },
    function(username, password, done) {
        User.authenticate(username, password, function(err, user) {
          return done(err, user);
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}