const _ = require('lodash');

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
        exports.setParamIfExist(paramsObj, modelParam, req, 'body.' + modelParam, params, update);
    });
    return paramsObj;
};

exports.createArea()