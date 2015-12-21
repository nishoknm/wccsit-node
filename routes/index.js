module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.render('index.ejs', {
            user: req.user
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/onlineregistration',
        failureFlash: true
    }));

    app.get('/onlineregistration', function (req, res) {

        res.render('onlineregistration.ejs', {message: req.flash('signupMessage'), user: req.user});
    });

    app.post('/onlineregistration', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.get('/speakers', function (req, res) {
        res.render('speakers.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

