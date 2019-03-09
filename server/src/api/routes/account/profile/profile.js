'use strict';

const router = require('express').Router({mergeParams: true});
const profile = require('../../../controllers/account/profile/profile');
const edit = require('./info/edit');
const localEdit = require('./local/edit');
const jwt = require('../../../controllers/auth/jwtAuth');

router.use('/info', edit);
router.use('/local', localEdit);

router
    .get('/', jwt.requireAuth, async (req, res) => {
        res.json(await profile.getProfile(req, 'all'));
    })
    .get('/google', jwt.requireAuth, async (req, res) => {
        res.json(await profile.getProfile(req, 'google'));
    })
    .get('/facebook', jwt.requireAuth, async (req, res) => {
        res.json(await profile.getProfile(req, 'facebook'));
    })
    .get('/local', jwt.requireAuth, async (req, res) => {
        res.json(await profile.getProfile(req, 'local'));
    })
    .get('/current', jwt.requireAuth, async (req, res) => {
        res.json(await profile.getProfile(req, 'current'));
    });

module.exports = router;