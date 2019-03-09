'use strict';

const router = require('express').Router({mergeParams: true});
const jwt = require('../../controllers/auth/jwtAuth');
const areaGetters = require('../../controllers/area/getters');
const areaSetters = require('../../controllers/area/setters');
const areaDeleters = require('../../controllers/area/deleters');
const actionRouter = require('./action');
const reactionRouter = require('./reaction');

router.get('/', jwt.requireAuth, async function (req, res) {
    res.json(await areaGetters.getFormattedAreasByUser(req.user))
});

router.post('/', jwt.requireAuth, async function (req, res) {
    res.json(await areaSetters.createArea(req))
});

router.get('/:areaId', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    res.json(await areaGetters.getFormattedAreaById(req.user, areaId))
});

router.delete('/:areaId', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    res.json(await areaDeleters.deleteArea(req, await areaGetters.getAreaById(req.user, areaId)))
});

router.put('/:areaId', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    res.json(await areaSetters.updateArea(req, await areaGetters.getAreaById(req.user, areaId)))
});

router.use('/:areaId/action', actionRouter);
router.use('/:areaId/reaction', reactionRouter);

module.exports = router;

