'use strict';

const _ = require('lodash');

const widgetGlobalParams = {
    account: {
        type: String,
        id: String,
    },
    params: {
    },
    data: {
    }
};

exports.setModelSchema = function (params) {
    let schema = _.cloneDeep(widgetGlobalParams);
    _.merge(schema, {params: params});
    return schema;
};