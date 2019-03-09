const _ = require('lodash');
const widgetGetter = require('./getters');
const widgetDeleter = require('./deleters');
const schemaGetter = require('../../../models/widget/schemaGetter');
const areaSetter = require('../setters');

async function save(widget) {
    return await widget.save(function (err, object) {
        if (err)
            return false;
        return object;
    });
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
        exports.setParamIfExist(paramsObj, modelParam, req, 'body.fields' + modelParam, params, update);
    });
    return paramsObj;
};

exports.addAction = async function (req, area) {
    let action = widgetGetter.getActionByServiceNameAndActionName(req.body.serviceName, req.body.name);
    let model = action.model;
    let params = exports.setWidgetParams(req, model, undefined, false);
    if (params === false)
        return {id: false, success: false};
    let newAction = new model();
    newAction.params = params;
    newAction.user.id = req.user._id;
    newAction = await save(newAction);
    await areaSetter.saveAction(area, newAction._id, req.body.serviceName, req.body.name);
    return {id: newAction._id, success: true};
};

exports.updateActionWithDelete = async function (req, area, actionObject) {
    await widgetDeleter.deleteAction(req, area, actionObject);
    return await exports.addAction(req, area);
};

exports.updateAction = async function (req, area, actionObject) {
    if (actionObject.serviceName !== req.body.serviceName || actionObject.name !== req.body.name)
        return exports.updateActionWithDelete(req, area, actionObject);
    let action = widgetGetter.getActionByServiceNameAndActionName(req.body.serviceName, req.body.name);
    let model = action.model;
    let params = exports.setWidgetParams(req, model, actionObject.params, false);
    if (params === false)
        return {id: false, success: false};
    actionObject.params = params;
    await save(actionObject);
    return {id: actionObject._id, success: true};
};


exports.addReaction = async function (req, area) {
    let reaction = widgetGetter.getReactionByServiceNameAndReactionName(req.body.serviceName, req.body.name);
    let model = reaction.model;
    let params = exports.setWidgetParams(req, model, undefined, false);
    if (params === false)
        return {id: false, success: false};
    let newReaction = new model();
    newReaction.params = params;
    newReaction.user.id = req.user._id;
    newReaction = await save(newReaction);
    await areaSetter.addReaction(area, newReaction._id, req.body.serviceName, req.body.name);
    return {id: newReaction._id, success: true};
};

exports.updateReactionWithDelete = async function (req, area, reactionObject) {
    await widgetDeleter.deleteReaction(req, area, reactionObject);
    return await exports.addReaction(req, area);
};

exports.updateReaction = async function (req, area, reactionObject) {
    if (reactionObject.serviceName !== req.body.serviceName || reactionObject.name !== req.body.name)
        return exports.updateReactionWithDelete(req, area, reactionObject);
    let action = widgetGetter.getActionByServiceNameAndActionName(req.body.serviceName, req.body.name);
    let model = action.model;
    let params = exports.setWidgetParams(req, model, reactionObject.params, false);
    if (params === false)
        return {id: false, success: false};
    reactionObject.params = params;
    await save(reactionObject);
    return {id: reactionObject._id, success: true};
};
