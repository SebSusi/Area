const _ = require('lodash');
const Area = require('../../models/area/Area');

async function save(area) {
    let save = await area.save(function (err, object) {
        if (err)
            return false;
        return object;
    });
    if (save === false)
        return false;
    return area;
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
    if (req.user !== undefined)
        area.ownerId = req.user.id;
    else return {success: false};
    if (req.body.name !== undefined)
        area.name = req.body.name;
    if (req.body.activated !== undefined)
        area.activated = req.body.activated;
    if (req.body.timer !== undefined)
        area.timer = req.body.timer;
    await save(area);
    return {id: area.id, success: true};
};

exports.createArea = async function (req) {
    let newArea = new Area();
    if (req.user !== undefined)
        newArea.ownerId = req.user.id;
    else return {success: false};
    if (req.body.name !== undefined)
        newArea.name = req.body.name;
    else return {success: false};
    if (req.body.activated !== undefined)
        newArea.activated = req.body.activated;
    else return {success: false};
    if (req.body.timer !== undefined)
        newArea.timer = req.body.timer;
    else return {success: false};
    newArea = await save(newArea);
    if (newArea === false)
        return {success: false};
    return {id: newArea.id, success: true};
};