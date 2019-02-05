'use strict';

const router = require('express').Router();
const profile = require('./profile/profile');

/*router
    .get('/', jwt.requireAuth, (req, res) => {
        res.status(200).send("Hello World !");
    });*/

router.use('/profile', profile);

module.exports = router;