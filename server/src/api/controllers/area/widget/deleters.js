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
    const evens = _.remove(area.reactions, async function (reactionAtPos) {
        return reactionAtPos.id === reactionId;
    });
    if (evens.empty())
        return {success: false};
    let reaction = evens[0];
    let reactionObject = await widgetGetter.getReactionWidgetByAreaReaction(reaction);
    let status = await reactionObject.remove();
    if (status !== false && status !== null && status !== undefined) {
        if ((await save(area)) === false)
            return {success: false};
        return {success: true};
    }
    return {success: false};
};