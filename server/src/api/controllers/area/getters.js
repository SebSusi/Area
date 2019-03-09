const Area = require('../../models/area/Area');
const _ = require('lodash');
const widgetGetter = require('./widget/getters');


exports.getAreasByUser = async function (user) {
    let findArea = await Area.find({'ownerId': user.id});
    if (findArea === false)
        return false;
    return findArea;
};

exports.getFormattedAreasByUser = async function (user) {
    let findAreas = await exports.getAreasByUser(user);
    let areas = [];
    for (let i = 0; i < findAreas.length; i++) {
        let area = findAreas[i];
        areas.push({
            "name": area.name,
            "activated": area.activated,
            "timer": area.timer,
            "uniqueId": area._id,
            "action": area.action,
            "reactions": area.reactions
        })
    }
    return areas;
};

exports.getFormattedAreaById = async function (user, id) {
    let findArea = await Area.findOne({'_id': id, 'ownerId': user.id});
    if (findArea === false)
        return false;
    let action = await widgetGetter.getFormattedAreaActionByArea(findArea);
    let reactions = await widgetGetter.getFormattedAreaReactionsByArea(findArea);
    return {
        "name": findArea.name,
        "activated": findArea.activated,
        "timer": findArea.timer,
        "uniqueId": findArea._id,
        "action": action,
        "reactions": reactions
    };
};

exports.getAreaById = async function (user, id) {
    let findArea = await Area.findOne({'_id': id, 'ownerId': user.id});
    if (findArea === false)
        return false;
    return findArea;
};

exports.getAreaActionByAreaId = async function (user, id) {
    let findArea = await exports.getAreaById(user, id);
    if (findArea === false)
        return false;
    return findArea.action;
};

exports.getAreaReactionsByAreaId = async function (user, id) {
    let findArea = await exports.getAreaById(user, id);
    if (findArea === false)
        return false;
    return findArea.reactions;
};

exports.getFormattedAreaActionByAreaId = async function (user, id) {
    let findArea = await exports.getAreaById(user, id);
    if (findArea === false)
        return false;
    return await widgetGetter.getFormattedAreaActionByArea(findArea);
};

exports.getFormattedAreaReactionsByAreaId = async function (user, id) {
    let findArea = await exports.getAreaById(user, id);
    if (findArea === false)
        return false;
    return await widgetGetter.getFormattedAreaReactionsByArea(findArea);
};

exports.getFormattedAreaReactionByAreaIdAndReactionId = async function (user, id, reactionId) {
    let findArea = await exports.getAreaById(user, id);
    if (findArea === false)
        return false;
    for (let i = 0; i < findArea.reactions.length; i++) {
        if (findArea.reactions[i].id === reactionId) {
            return await widgetGetter.getFormattedAreaReactionByReaction(findArea.reactions[i]);
        }
    }
    return false;
};

exports.getFormattedAreaActionByAreaIdAndActionId = async function (user, id, actionId) {
    let findArea = await exports.getAreaById(user, id);
    if (findArea === false)
        return false;
    if (findArea.action.id === actionId)
        return await widgetGetter.getFormattedAreaActionByArea(findArea);
    return false;
};