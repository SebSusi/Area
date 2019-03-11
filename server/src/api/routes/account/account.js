'use strict';

const router = require('express').Router({mergeParams: true});
const profile = require('./profile/profile');

router.use('/profile', profile);

module.exports = router;