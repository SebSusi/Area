const _ = require('lodash');
const Area = require('../../models/area/Area');

async function save(area) {
    return await area.save(function (err, object) {
        if (err)
            return false;
        return object;
    });
}

exports.saveAction = async function (area, id, serviceName, name) {
    area.action = {
        id: id,
        name: name,
        serviceName: serviceName,
    };
    return await save(area);
};

exports.addReaction = async function (area, id, serviceName, name) {
    area.reactions.push({
        id: id,
        name: name,
        serviceName: serviceName,
    });
    return await save(area);
};

exports.deleteReaction = async function (area, reaction) {
    _.remove(area.reactions, function (savedReaction) {
        return savedReaction.id === reaction.id;
    });
    return await save(area);
};

exports.deleteReactions = async function (area) {
    area.reactions = [];
    return await save(area);
};

exports.deleteAction = async function (area) {
    area.action = null;
    return await save(area);
};

exports.updateArea = async function (req, area) {
    if (area === false)
        return {success: false};
    area.params = params;
    area.ownerId = req.user._id;
    area.name = req.body.name;
    area.activated = req.body.activated;
    area.timer = req.body.timer;
    await save(area);
    return {id: area._id, success: true};
};

exports.createArea = async function (req) {
    let newArea = new Area();
    newArea.params = params;
    newArea.ownerId = req.user._id;
    newArea.name = req.body.name;
    newArea.activated = req.body.activated;
    newArea.timer = req.body.timer;
    newArea = await save(newArea);
    return {id: newArea._id, success: true};
};