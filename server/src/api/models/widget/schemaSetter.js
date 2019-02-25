'use strict';

const _ = require('lodash');

const widgetGlobalParams = {
    user: {
        id: String,
    },
    params: {
        timer: {type: Number, default: 0},
    }
};

exports.setModelSchema = function (params) {
    let schema = _.cloneDeep(widgetGlobalParams);
    _.merge(schema, {params: params});
    return schema;
};