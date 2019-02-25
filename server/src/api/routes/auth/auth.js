'use strict';

const router = require('express').Router();
const local = require('./localAuth');
const google = require('./googleAuth');
const facebook = require('./facebookAuth');
const logout = require('./logout');

const _ = require('../../config/widgets');

router.use('/local', local);
router.use('/google', google);
router.use('/facebook', facebook);
router.use('/logout', logout);

module.exports = router;