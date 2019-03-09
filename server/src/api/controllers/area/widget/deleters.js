const _ = require('lodash');

async function save(widget) {
    return await widget.save(function (err, object) {
        if (err)
            return false;
        return object;
    });
}

exports.deleteActionWithoutSaveArea = async function (action) {
    return await action.remove(async function (err) {
        return err
    });
};

exports.deleteAction = async function (area, actionId) {
    if (area.action.id !== actionId)
        return {success: false};
    return await action.remove(async function (err) {
        if (err)
            return {success: false};
        area.action = null;
        if ((await save(area)) === false)
            return {success: false};
        return {success: true};
    });
};

exports.deleteReactionWithoutSaveArea = async function (reaction) {
    return await reaction.remove(async function (err) {
        return err
    });
};

exports.deleteReaction = async function (area, reaction) {
    const evens = _.remove(area.reactions, async function (reactionAtPos) {
        return reactionAtPos.id === reaction.id;
    });
    if (evens.empty())
        return {success: false};
    return await reaction.remove(async function (err) {
        if (err)
            return {success: false};
        if ((await save(area)) === false)
            return {success: false};
        return {success: true};
    });
};