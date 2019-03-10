'use strict';

const _ = require('lodash');
const Weather = require('weather-js');

exports.getOutput = async function (action, actionInfos, account) {
    const params = action.params;
    return new Promise(function (resolve, reject) {
        Weather.find({search: params.city + "," + params.country, degreeType: 'C'}, function (err, response) {
            if (err)
                reject(false);
            try {
                const w = response[0].current;
                resolve({
                    temperature: w.temperature,
                    skycode: w.skycode,
                    skyText: w.skytext,
                    date: w.date,
                    observationTime: w.observationtime,
                    observationPoint: w.observationpoint,
                    feelsLike: w.feelslike,
                    humidity: w.humidity,
                    windDisplay: w.windDisplay,
                    day: w.day,
                    imageUrl: w.imageUrl
                });
            }
            catch (e) {
                resolve(false);
            }
        })
    });
};