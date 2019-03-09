'use strict';


const router = require('express').Router({mergeParams: true});
const passport = require('../../controllers/auth/google/google');
const jwt = require('../../controllers/auth/jwtAuth');
const authUtils = require('../../controllers/auth/common/utils');
const authUnlink = require('../../controllers/auth/common/unlink');

router.post('/', jwt.canAuth, function (req, res, next) {
    passport.authenticate('google-token-login', function (err, user, info) {
        res.json(info);
    })(req, res, next);
});

router.delete('/', jwt.requireAuth, async function (req, res) {
    let test = await authUnlink.deleteAuth(req, res, 'google');
    console.log(test);
    res.json(test)
});

module.exports = router;