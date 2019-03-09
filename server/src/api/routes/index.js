'use strict';

const router = require('express').Router({mergeParams: true});
const jwt = require('../controllers/auth/jwtAuth');
const auth = require('./auth/auth');
const account = require('./account/account');
const area = require('./area/area');
const areaInfo = require('../controllers/area/about');

router
    .get('/', jwt.requireAuth, (req, res) => {
        res.status(200).send("Hello World !");
    });

router
    .get('/about.json', async (req, res) => {
        try {
            res.json(await areaInfo.getAbout(req));
        } catch (e) {
            res.json({success: false})
        }
    });

router
    .get('/area_info', async (req, res) => {
        try {
            res.json((await areaInfo.getAbout(req)).server.services);
        } catch (e) {
            res.json({success: false})
        }
    });

router.use('/auth', auth);
router.use('/account', account);
router.use('/area', area);
//const test = require('../controllers/area/widget/getters');
//console.log(test.getActionByServiceNameAndActionName("weather", "current"));

module.exports = router;

