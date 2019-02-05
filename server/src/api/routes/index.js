'use strict';

const router = require('express').Router();
const jwt = require('../controllers/auth/jwtAuth');
const auth = require('./auth/auth');
const account = require('./account/account');


router
    .get('/', jwt.requireAuth, (req, res) => {
        res.status(200).send("Hello World !");
    });

router.use('/auth', auth);
router.use('/account', account);

module.exports = router;

