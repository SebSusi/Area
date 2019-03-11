'use strict';

const router = require('express').Router({mergeParams: true});
const profile = require('./profile/profile');
const jwt = require('../../controllers/auth/jwtAuth');
const accountGetter = require('../../controllers/area/account/getters');
const accountSetter = require('../../controllers/area/account/setters');
const accountDeleter = require('../../controllers/area/account/deleters');

router
    .get('/', jwt.requireAuth, async (req, res) => {
        res.json(await accountGetter.getFormattedAccounts(req.user))
    });

router
    .get('/:accountType', jwt.requireAuth, async (req, res) => {
        let accountType = req.params.accountType;
        res.json(await accountGetter.getFormattedAccountsByType(req.user, accountType))
    });

router
    .get('/:accountType/:accountId', jwt.requireAuth, async (req, res) => {
        let accountId = req.params.accountId;
        res.json(await accountGetter.getFormattedAccountById(req.user, accountId))
    });

router
    .delete('/:accountType/:accountId', jwt.requireAuth, async (req, res) => {
        let accountType = req.params.accountType;
        let accountId = req.params.accountId;
        res.json(await accountDeleter.deleteAccount(req.user, accountType, accountId))
    });

router
    .post('/', jwt.requireAuth, async (req, res) => {
        res.json(await accountSetter.addAccount(req))
    });

module.exports = router;