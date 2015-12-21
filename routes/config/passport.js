/**
 * Created by Nishok on 12/19/2015.
 */

var LocalStrategy = require('passport-local').Strategy;

var User = require('./user');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            User.findOne({'local.email': email}, function (err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model
                    newUser.local.fName = req.body.fName;
                    newUser.local.lName = req.body.lName;
                    newUser.local.number = req.body.number;
                    newUser.local.attendee = req.body.attendee;
                    newUser.local.comOrg = req.body.comOrg;
                    newUser.local.sex = req.body.sex;

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });

        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.findOne({'local.email': email}, function (err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                return done(null, user);
            });
        }));
};
