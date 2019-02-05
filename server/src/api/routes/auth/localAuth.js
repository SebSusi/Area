'use strict';

const router = require('express').Router();
const passport = require('../../controllers/auth/local/local');
const jwt = require('../../controllers/auth/jwtAuth');
const authUtils = require('../../controllers/auth/common/utils');
const authUnlink = require('../../controllers/auth/common/unlink');

router.post('/in', jwt.canAuth, function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        res.json(info);
    })(req, res, next);
});

router.post('/up', jwt.canAuth, function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        res.json(info);
    })(req, res, next);
});

router.post('/link', jwt.canAuth, function (req, res, next) {
    passport.authenticate('local-link', function (err, user, info) {
        res.json(info);
    })(req, res, next);
});

router.get('/test', jwt.requireAuth, function (req, res) {
    res.send('It worked! User id is: ' + req.user + '.');
});

router.delete('/', jwt.requireAuth, async function (req, res) {
    let test = await authUnlink.deleteAuth(req, res, 'local');
    console.log(test);
    res.json(test)
});

module.exports = router;