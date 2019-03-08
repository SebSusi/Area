const _ = require('lodash');
const widgetGetter = require('./getters');
const schemaGetter = require('../../models/widget/schemaGetter');
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
