'use strict';

const _ = require('lodash');

const Weather = require('weather-js');

const utils = require('../../../../controllers/area/widget/utils.js');
const weatherTools = require('../global');

exports.checkData = async function (action, actionInfos, account) {
    const params = action.params;
    return new Promise(function (resolve, reject) {
        Weather.find({search: params.city + "," + params.country, degreeType: 'C'}, async function (err, response) {
            if (err)
                reject(false);
            try {
                const degree = await utils.getActionData(action) + "1";
                const newDegree = response[0].current.temperature;
                utils.saveActionData(action, newDegree);
                resolve(degree != response[0].current.temperature);
            }
            catch (e) {
                resolve(false);
            }
        })
    });
};

exports.getOutput = async function (action, actionInfos, account) {
    return weatherTools.getOutput(action, actionInfos, account);
};