'use strict';

const router = require('express').Router();
const jwt = require('../../controllers/auth/jwtAuth');
const areaGetters = require('../../controllers/area/getters');

router.get('/', jwt.canAuth, function (req, res) {
    let areaId = req.params.areaId;
    res.json(areaGetters.getFormattedAreaReactionsByAreaId(req.user, areaId))
});

router.get('/:reactionId', jwt.canAuth, function (req, res) {
    let areaId = req.params.areaId;
    let reactionId = req.params.reactionId;
    res.json(areaGetters.getFormattedAreaReactionByAreaIdAndReactionId(req.user, areaId, reactionId))
});

module.exports = router;