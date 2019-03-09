'use strict';

const router = require('express').Router({mergeParams: true});
const jwt = require('../../controllers/auth/jwtAuth');

router.get('/', jwt.requireAuth,function (req, res) {
    req.logout();
    jwt.deleteToken(req);
    res.json({success: true})
});

module.exports = router;