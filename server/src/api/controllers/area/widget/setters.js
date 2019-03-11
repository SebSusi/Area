const _ = require('lodash');
const widgetGetter = require('./getters');
const widgetDeleter = require('./deleters');
const schemaGetter = require('../../../models/widget/schemaGetter');
const areaSetter = require('../setters');

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

exports.setParamIfExist = function (paramsObj, paramKey, valueObj, valueKey, params, update) {
    if (paramKey !== undefined && paramKey !== '') {
        if (valueKey !== undefined && valueKey !== '') {
            if (_.hasIn(valueObj, valueKey) && _.get(valueObj, valueKey) !== "" && _.get(valueObj, valueKey) !== '' &&
                _.get(valueObj, valueKey) !== null)
                _.merge(paramsObj, {[paramKey]: _.get(valueObj, valueKey)});
            else if (update === true && params !== undefined) {
                _.assignWith(paramsObj, {[paramKey]: params[paramKey]});
            }
            else if (params === undefined && update === false) {
                _.assignWith(paramsObj, {[paramKey]: undefined});
            }
        }
    }
    return (paramsObj);
};

exports.setWidgetParams = function (req, model, params, update) {
    let paramsObj = {};
    let modelParams = schemaGetter.getModelSchemaParams(model);
    modelParams.forEach(function (modelParam) {
        exports.setParamIfExist(paramsObj, modelParam, req, 'body.fields.' + modelParam, params, update);
    });
    return paramsObj;
};

exports.addAction = async function (req, area) {
    let action = widgetGetter.getActionByServiceNameAndActionName(req.body.serviceName, req.body.name);
    if (action === false || action === undefined)
        return {success: false};
    let model = action.model;
    let params = exports.setWidgetParams(req, model, undefined, false);
    if (params === false)
        return {id: false, success: false};
    let newAction = new model();
    let account = req.body.account;
    if (account === undefined || account === null)
        newAction.account = null;
    else {
        newAction.account = {
            id: account.id,
            accountType: account.type,
        };
    }
    newAction.params = params;
    newAction.user.id = req.user.id;
    newAction = await save(newAction);
    await areaSetter.saveAction(area, newAction.id, req.body.serviceName, req.body.name);
    return {id: newAction.id, success: true};
};

exports.updateActionWithDelete = async function (req, area, actionId) {
    await widgetDeleter.deleteAction(area, actionId);
    return await exports.addAction(req, area);
};


exports.addReaction = async function (req, area) {
    let reaction = widgetGetter.getReactionByServiceNameAndReactionName(req.body.serviceName, req.body.name);
    if (reaction === false)
        return {success: false};
    let model = reaction.model;
    let params = exports.setWidgetParams(req, model, undefined, false);
    if (params === false)
        return {id: false, success: false};
    let newReaction = new model();
    newReaction.params = params;
    let account = req.body.account;
    if (account === undefined || account === null)
        newReaction.account = null;
    else {
        newReaction.account = {
            id: account.id,
            accountType: account.type,
        };
    }
    newReaction.user.id = req.user.id;
    newReaction = await save(newReaction);
    await areaSetter.addReaction(area, newReaction.id, req.body.serviceName, req.body.name);
    return {id: newReaction.id, success: true};
};

exports.updateReactionWithDelete = async function (req, area, reactionId) {
    await widgetDeleter.deleteReaction(area, reactionId);
    return await exports.addReaction(req, area);
};

exports.updateAction = async function (req, area, actionObject) {
    if (area.action.serviceName !== req.body.serviceName || area.action.name !== req.body.name)
        return exports.updateActionWithDelete(req, area, area.action.id);
    let action = widgetGetter.getActionByServiceNameAndActionName(req.body.serviceName, req.body.name);
    if (action === false)
        return {success: false};
    let model = action.model;
    let params = exports.setWidgetParams(req, model, actionObject.params, false);
    if (params === false)
        return {id: false, success: false};
    let account = req.body.account;
    if (account === undefined || account === null)
        actionObject.account = null;
    else {
        actionObject.account = {
            id: account.id,
            accountType: account.type,
        };
    }
    actionObject.params = params;
    await save(actionObject);
    return {id: actionObject.id, success: true};
};

exports.updateReaction = async function (req, area, reactionObject) {
    let areaReaction = await widgetGetter.getAreaReactionByAreaAndId(area, reactionObject.id);
    if (areaReaction.serviceName !== req.body.serviceName || areaReaction.name !== req.body.name)
        return exports.updateReactionWithDelete(req, area, areaReaction.id);
    let reaction = widgetGetter.getReactionByServiceNameAndReactionName(req.body.serviceName, req.body.name);
    if (reaction === false)
        return {success: false};
    let model = reaction.model;
    let params = exports.setWidgetParams(req, model, reactionObject.params, false);
    if (params === false)
        return {id: false, success: false};
    let account = req.body.account;
    if (account === undefined || account === null)
        reactionObject.account = null;
    else {
        reactionObject.account = {
            id: account.id,
            accountType: account.type,
        };
    }
    reactionObject.params = params;
    await save(reactionObject);
    return {id: reactionObject.id, success: true};
};
