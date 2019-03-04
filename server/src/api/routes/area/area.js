'use strict';

const router = require('express').Router();
const jwt = require('../../controllers/auth/jwtAuth');
const areaGetters = require('../../controllers/area/getters');
const actionRouter = require('./action');
const reactionRouter = require('./reaction');

router.get('/', jwt.canAuth, function (req, res) {
    res.json(areaGetters.getFormattedAreasByUser(req.user))
});

router.get('/:areaId', jwt.canAuth, function (req, res) {
    let areaId = req.params.areaId;
    res.json(areaGetters.getFormattedAreaById(req.user, areaId))
});

router.use('/:areaId/action', actionRouter);
router.use('/:areaId/reaction', reactionRouter);

module.exports = router;

