'use strict';

const router = require('express').Router({mergeParams: true});
const jwt = require('../../controllers/auth/jwtAuth');
const areaGetters = require('../../controllers/area/getters');
const areaSetters = require('../../controllers/area/setters');
const actionDeleters = require('../../controllers/area/widget/deleters');
const actionGetters = require('../../controllers/area/widget/getters');
const actionSetters = require('../../controllers/area/widget/setters');

router.get('/', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    res.json(await areaGetters.getFormattedAreaActionByAreaId(req.user, areaId))
});

router.post('/', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    let area = await areaGetters.getAreaById(req.user, areaId);
    if (area === false) {
        res.json({success: false});
        return false;
    }
    res.json(await actionSetters.addAction(req, area));
});

router.get('/:actionId', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    let actionId = req.params.actionId;
    res.json(await areaGetters.getFormattedAreaActionByAreaIdAndActionId(req.user, areaId, actionId))
});

router.delete('/:actionId', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    let actionId = req.params.actionId;
    let area = await areaGetters.getAreaById(req.user, areaId);
    if (area === false) {
        res.json({success: false});
        return false;
    }
    res.json(await actionDeleters.deleteAction(area, actionId));
});

router.put('/:actionId', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    let actionId = req.params.actionId;
    let area = await areaGetters.getAreaById(req.user, areaId);
    if (area === false) {
        res.json({success: false});
        return false;
    }
    let action = await actionGetters.getActionWidgetByAreaAction(area.action);
    if (action === false || action.id !== actionId) {
        res.json({success: false});
        return false;
    }
    res.json(await actionSetters.updateAction(req, area, action));
});

module.exports = router;