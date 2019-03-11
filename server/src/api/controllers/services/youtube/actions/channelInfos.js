'use strict';

const YouTube = require('better-youtube-api').YouTube;
const _ = require('lodash');
const apiKeys = require('../../../../config/apiKeys');
const request = require('request');

async function getYoutubeChannelId(url) {
    let id = '';
    let username = false;
    let error = false;
    url = url.replace(/(>|<)/gi, '').split(/(\/channel\/|\/user\/)/);
    if (url[2] !== undefined) {
        id = url[2].split(/[^0-9a-z_-]/i);
        id = id[0];
    }
    if (/\/user\//.test(url)) {
        username = id;
    }
    if (!id) {
        return false;
    }
    if (username) {
        let url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=${username}&key=${apiKeys.youtube.apiKey}`;
        let bodyPromise = new Promise(function (resolve, reject) {
            request(url, function (err, response, body) {
                if (err)
                    reject(false);
                resolve(body);
            });
        });
        let body = await bodyPromise;
        if (body !== undefined && body !== false) {
            console.log("****\n"+body+"****");
            body = JSON.parse(body);
            if (body && body.items && body.items.length) {
                id = body.items[0].id;
            } else
                error = true;
        }
        else
            error = true;
    }
    return {id, username, error};
}
exports.checkData = async function(action, actionInfo, account) {
    const params = action.params;
    getYoutubeChannelId(params.channelUrl);
    return true;
};

exports.getOutput = async function(action, actionInfo, account) {
    return null;
};