'use strict';

const router = require('express').Router();
const jwt = require('../../controllers/auth/jwtAuth');
const areaGetters = require('../../controllers/area/getters');
const areaSetters = require('../../controllers/area/setters');
const areaDeleters = require('../../controllers/area/deleters');
const actionRouter = require('./action');
const reactionRouter = require('./reaction');

router.get('/', jwt.requireAuth, function (req, res) {
    res.json(areaGetters.getFormattedAreasByUser(req.user))
});

router.post('/', function (req, res) {
    res.json(res.json(areaSetters.createArea(req)))
});

router.get('/:areaId', jwt.requireAuth, function (req, res) {
    let areaId = req.params.areaId;
    res.json(areaGetters.getFormattedAreaById(req.user, areaId))
});

router.delete('/:areaId', jwt.requireAuth, function (req, res) {
    let areaId = req.params.areaId;
    res.json(areaDeleters.deleteArea(req, areaGetters.getAreaById(req.user, areaId)))
});

router.put('/:areaId', jwt.requireAuth, function (req, res) {
    let areaId = req.params.areaId;
    res.json(areaSetters.updateArea(req, areaGetters.getAreaById(req.user, areaId)))
});

router.use('/:areaId/action', actionRouter);
router.use('/:areaId/reaction', reactionRouter);

module.exports = router;

