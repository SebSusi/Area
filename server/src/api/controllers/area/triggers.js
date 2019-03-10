const AreaModel = require('../../models/area/Area');
const _ = require('lodash');
const areaGetter = require('../area/getters');
const widgetGetter = require('../area/widget/getters');

async function parseReactionParam(reaction, output) {

}

async function parseReactionParams(reaction, output) {
    return null;
}

async function triggerFunction(areaId) {
    let area = await areaGetter.getAreaByIdWithoutUser(areaId);
    if (area === false) {
        await exports.stopAreaTimer(areaId);
        return;
    }
    let action = await widgetGetter.getActionWidgetByAreaAction(area.action);
    if (action === false)
        return;
    let actionConfig = widgetGetter.getActionByServiceNameAndActionName(area.action.serviceName, area.action.name);
    if (actionConfig.controller.checkData === undefined || actionConfig.controller.getOutput === undefined)
        return;
    let dataChange = await actionConfig.controller.checkData(action, actionConfig, null);
    if (!dataChange)
        return;
    let output = await actionConfig.controller.getOutput(action, actionConfig, null);
    for (let i = 0; i < area.reactions.length; i++) {
        let areaReaction = area.reactions[i];
        let reactionConfig = widgetGetter.getReactionByServiceNameAndReactionName(areaReaction.serviceName,
            areaReaction.name);
        let reaction = widgetGetter.getReactionWidgetByAreaReaction(areaReaction);
        if (reaction !== false) {
            if (reactionConfig.controller.doReaction !== undefined)
                await reactionConfig.controller.doReaction(reaction, reactionConfig,
                    await parseReactionParams(reaction, output), null)
        }
    }
}


exports.serverStartCreateTimers = async function () {
    global.areaTimers = [];
    let areas = await AreaModel.find();
    if (areas === false)
        return false;
    for (let i = 0; i < areas.length; i++) {
        let area = areas[i];
        if (area.activated === true)
            await exports.startAreaTimer(area);
    }
};

exports.stopAreaTimer = async function (areaId) {
    let evens = _.remove(global.areaTimers, function (areaTimer) {
        return areaTimer.id === areaId;
    });
    if (_.isEmpty(evens))
        return false;
    clearInterval(evens[0].timer);
    return true;
};

exports.startAreaTimer = async function (area) {
    if (area.activated === true) {
        console.log("Create timer for " + area.id);
        let timer = setInterval(triggerFunction, area.timer * 1000, area.id);
        global.areaTimers.push({
            id: area.id,
            timer: timer
        })
    }
};