'use strict';

const _ = require('lodash');

const Weather = require('weather-js');

exports.checkData = async function(action, actionInfos, account) {
    if (!_.hasIn(params, 'city') || !_.hasIn(params, 'country'))
        return false;
    return new Promise(function (resolve, reject) {
        Weather.find({search: params.city + "," + params.country, degreeType: 'C'}, function (err, response) {
            if (err)
                reject(false);
            try {
                resolve(response[0].current);
            }
            catch (e) {
                resolve(false);
            }
        })
    });
};

exports.getOutput = async function(action, actionInfos, account) {

};