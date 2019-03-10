'use strict';

const _ = require('lodash');
const utils = require('../../../../controllers/area/widget/utils.js');
var Gmail = require('node-gmail-api');

exports.checkData = async function(action, actionInfo, account) {
    var gmail = new Gmail(account.accessToken);
    var message =gmail.messages('label:inbox', {max: 1});
    const params = action.params;

    return new Promise(function (resolve, reject) {
        message.on('data', function (data) {
            console.log(d.id)
            if (d)
                reject(false);
            try {
                //resolve(await utils.compareActionData(action, d));
            }
            catch (e) {
                resolve(false);
            }
        })
    });
};

exports.getOutput = async function(action, actionInfo, account) {
    return null;
};