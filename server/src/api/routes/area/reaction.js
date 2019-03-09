'use strict';

const router = require('express').Router({mergeParams: true});
const jwt = require('../../controllers/auth/jwtAuth');
const areaGetters = require('../../controllers/area/getters');
const areaSetters = require('../../controllers/area/setters');
const reactionDeleters = require('../../controllers/area/widget/deleters');
const reactionGetters = require('../../controllers/area/widget/getters');
const reactionSetters = require('../../controllers/area/widget/setters');


router.get('/', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    res.json(await areaGetters.getFormattedAreaReactionsByAreaId(req.user, areaId))
});


router.post('/', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    let area = await areaGetters.getAreaById(req.user, areaId);
    if (area === false) {
        res.json({success: false});
        return false;
    }
    res.json(await reactionSetters.addReaction(req, area));
});

router.get('/:reactionId', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    let reactionId = req.params.reactionId;
    res.json(await areaGetters.getFormattedAreaReactionByAreaIdAndReactionId(req.user, areaId, reactionId))
});

router.delete('/:reactionId', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    let reactionId = req.params.reactionId;
    let area = await areaGetters.getAreaById(req.user, areaId);
    if (area === false) {
        res.json({success: false});
        return false;
    }
    res.json(await reactionDeleters.deleteReaction(area, reactionId));
});

router.put('/:reactionId', jwt.requireAuth, async function (req, res) {
    let areaId = req.params.areaId;
    let reactionId = req.params.reactionId;
    let area = await areaGetters.getAreaById(req.user, areaId);
    if (area === false) {
        res.json({success: false});
        return false;
    }
    let reaction = await reactionGetters.getReactionWidgetByAreaReaction(area.reaction);
    if (action === false || reaction.id !== reactionId) {
        res.json({success: false});
        return false;
    }
    res.json(await reactionSetters.updateReaction(req, areaGetters.getAreaById(req.user, areaId), reaction));
});

module.exports = router;