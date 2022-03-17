const router = require('express').Router();
const passport = require('passport');
require('../configuration/passportConfig')(passport); // why does this line only work in this file

router.post('/', (req, res, next) => {
    passport.authenticate('user-local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send(info.message);
        else{
            req.logIn(user, (err) => {
                if (err) {throw err;}
                res.send(true);
            })
        }
    })(req, res, next);
});

router.post('/staff', (req, res, next) => {
    passport.authenticate('staff-local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send({status: false, message: info.message});
        else{
            req.logIn(user, (err) => {
                if (err) {throw err;}
                res.send({status: true});
            })
        }
    })(req, res, next);
});

module.exports = router;