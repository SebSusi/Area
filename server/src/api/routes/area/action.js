'use strict';

const router = require('express').Router();
const jwt = require('../../controllers/auth/jwtAuth');
const areaGetters = require('../../controllers/area/getters');

router.get('/', jwt.canAuth, function (req, res) {
    let areaId = req.params.areaId;
    res.json(areaGetters.getFormattedAreaActionByAreaId(req.user, areaId))
});

router.get('/:actionId', jwt.canAuth, function (req, res) {
    let areaId = req.params.areaId;
    let actionId = req.params.actionId;
    res.json(areaGetters.getFormattedAreaActionByAreaIdAndActionId(req.user, areaId, actionId))
});

module.exports = router;