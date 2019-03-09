const _ = require('lodash');
const widgetGetter = require('./getters');

async function save(widget) {
    let save = await widget.save(function (err, object) {
        if (err)
            return false;
        return object;
    });
    if (save === false)
        return false;
    return widget;
}

exports.deleteActionWithoutSaveArea = async function (action) {
    return await action.remove();
};

exports.deleteAction = async function (area, actionId) {
    if (area.action.id !== actionId)
        return {success: false};
    let action = await widgetGetter.getActionWidgetByAreaAction(area.action);
    let status = await action.remove();
    if (status !== false && status !== null && status !== undefined) {
        area.action = {};
        if ((await save(area)) === false)
            return {success: false};
        return {success: true};
    }
    return {success: false};
};

exports.deleteReactionWithoutSaveArea = async function (reaction) {
    return await reaction.remove();
};

exports.deleteReaction = async function (area, reactionId) {
    let reaction = await _.find(area.reactions, {id: reactionId});
    if (reaction === undefined)
        return {success: false};
    await area.reactions.pull({'_id': reaction._id});
    let reactionObject = await widgetGetter.getReactionWidgetByAreaReaction(reaction);
    let status = await reactionObject.remove();
    if (status !== false && status !== null && status !== undefined) {
        if ((await save(area)) === false)
            return {success: false};
        return {success: true};
    }
    return {success: false};
};