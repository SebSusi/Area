const widgetsConfig = require('../../../config/widgets');
const _ = require('lodash');

function getByServiceNameAndActionName(service, name, type) {
    if (_.hasIn(widgetsConfig, service + "." + type)) {
        for (let i = 0; i < (widgetsConfig[service][type]).length; i++) {
            let element = (widgetsConfig[service][type])[i];
            if (element.name === name)
                return element;
        }
        return false;
    }
}

function getModelByServiceNameAndActionName(service, name, type) {
    let element = getByServiceNameAndActionName(service, name, type);
    if (element === false || element === undefined || element.model === undefined)
        return false;
    return element.model;
}

exports.getActionModelByServiceNameAndActionName = function (service, action) {
    return getModelByServiceNameAndActionName(service, action, "actions");
};

exports.getReactionModelByServiceNameAndReactionName = function (service, reaction) {
    return getModelByServiceNameAndActionName(service, reaction, "reactions");
};

exports.getActionByServiceNameAndActionName = function (service, action) {
    return getByServiceNameAndActionName(service, action, "actions");
};

exports.getReactionByServiceNameAndReactionName = function (service, reaction) {
    return getByServiceNameAndActionName(service, reaction, "reactions");
};

exports.getActionWidgetByAreaAction = async function (areaAction) {
    if (String(areaAction) === "{}" || areaAction === undefined || areaAction === null)
        return false;
    let model = getModelByServiceNameAndActionName(areaAction.serviceName, areaAction.name, "actions");
    return await model.findOne({"_id": areaAction.id})
};

exports.getReactionWidgetByAreaReaction = async function (areaReaction) {
    if (String(areaReaction) === "{}" || areaReaction === undefined || areaReaction === null)
        return false;
    let model = getModelByServiceNameAndActionName(areaReaction.serviceName, areaReaction.name, "reactions");
    return await model.findOne({"_id": areaReaction.id})
};

exports.getWidgetByObjectAndType = async function (object, type) {
    if (String(object) === "{}" || object === undefined || object === null)
        return false;
    let model = getModelByServiceNameAndActionName(object.serviceName, object.name, type);
    return await model.findOne({"_id": object.id})
};

async function getFormattedAreaActionReaction(type, object) {
    if (object === null || object === undefined || String(object) === "{}")
        return {};
    let databaseObject = await exports.getWidgetByObjectAndType(object, type);
    console.log(databaseObject);
    if (databaseObject === false || databaseObject === null)
        return false;
    let account = databaseObject.account;
    if (account === {} || account === undefined)
        account = null;
    let fieldsOption = getByServiceNameAndActionName(object.serviceName, object.name, type).fields;
    let fields = [];
    for (let i = 0; i < fieldsOption.length; i++) {
        fields.push({
            'name': fieldsOption[i].name,
            'value': databaseObject.params[fieldsOption[i].name]
        });
    }
    return {
        "name": object.name,
        "serviceName": object.serviceName,
        "id": object.id,
        "account": account,
        fields: fields
    }
}

exports.getFormattedAreaActionByAction = async function (action) {
    if (action === null || action === undefined || String(action) === "{}")
        return {};
    return getFormattedAreaActionReaction("actions", action)
};

exports.getFormattedAreaReactionByReaction = async function (reaction) {
    if (reaction === null || reaction === undefined || String(reaction) === "{}")
        return {};
    return getFormattedAreaActionReaction("reactions", reaction)
};

exports.getFormattedAreaReactionsByReactions = async function (reactions) {
    if (reactions === null || reactions === undefined || String(reactions) === "{}" || reactions === [])
        return [];
    let formattedReactions = [];
    for (let i = 0; i < reactions.length; i++) {
        let reaction = await getFormattedAreaActionReaction("reactions", reactions[i]);
        if (reaction !== false)
            formattedReactions.push(reaction)
    }
    return formattedReactions;
};

exports.getAreaReactionByAreaAndId = async function (area, reactionId) {
    return await _.find(area.reactions, {id: reactionId});
};

exports.getFormattedAreaActionByArea = async function (area) {
    if (area === null || area === undefined || String(area) === "{}")
        return {};
    return exports.getFormattedAreaActionByAction(area.action)
};

exports.getFormattedAreaReactionsByArea = async function (area) {
    if (area === null || area === undefined || String(area) === "{}")
        return [];
    return exports.getFormattedAreaReactionsByReactions(area.reactions)
};