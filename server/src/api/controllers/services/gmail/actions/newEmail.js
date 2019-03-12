'use strict';

const _ = require('lodash');
const utils = require('../../../../controllers/area/widget/utils.js');
var Gmail = require('node-gmail-api');

exports.checkData = async function(action, actionInfo, account) {
    var gmail = new Gmail(account.accessToken);
    var message =gmail.messages('label:inbox', {max: 1});
    const params = action.params;

    return new Promise(async function (resolve, reject) {
        message.on('data', async function (data) {
            console.log(data.id)
            if (data)
                reject(false);
            try {
                resolve(await utils.compareActionData(action, data.id));
            }
            catch (e) {
                resolve(false);
            }
        })
    });
};

exports.getOutput = async function(action, actionInfo, account) {
    return action.data;
};