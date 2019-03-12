'use strict';

const YouTube = require('better-youtube-api').YouTube;
const _ = require('lodash');
const apiKeys = require('../../../../config/apiKeys');
const request = require('request');
const utils = require('../../../../controllers/area/widget/utils.js');
const global = require('../global');

async function getYoutubeChannelId(action) {
    let youtubedata = null;
    const params = action.params;
    let username = global.getusernameInUrl(params.channelUrl);
    if (username) {
        let url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=${username}&key=${apiKeys.youtube.apiKey}`;
        return new Promise(async function (resolve, reject) {
            request(url, async function (err, response, body) {
                if (err)
                    reject(false);
                body = JSON.parse(body);
                switch (params.type) {
                    case 0:
                        youtubedata = body.items[0].statistics.subscriberCount;
                        break;
                    case 1:
                        youtubedata = body.items[0].statistics.commentCount;
                        break;
                    case 2:
                        youtubedata = body.items[0].statistics.videoCount;
                        break;
                };
                resolve(await utils.compareActionDatawithInterval(action, youtubedata, params.interval));
            });
        });
    }
    else
        return false;
};
exports.checkData = async function (action, actionInfo, account) {
    return getYoutubeChannelId(action);
};

exports.getOutput = async function (action, actionInfo, account) {
    let statistics = null;
    let info = null;
    const params = action.params;
    let username = global.getusernameInUrl(params.channelUrl);
    if (username) {
        let url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=${username}&key=${apiKeys.youtube.apiKey}`;
        let url2 = `https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=${username}&key=${apiKeys.youtube.apiKey}`;
        return new Promise(async function (resolve, reject) {
            request(url, async function (err, response, body) {
                if (err)
                    reject(false);
                body = JSON.parse(body);
                statistics = body.items[0].statistics;
                request(url2, async function (err, response, body) {
                    if (err)
                        reject(false);
                    body = JSON.parse(body);
                    info = body.items[0].snippet;
                    resolve({
                        title: info.title,
                        description:info.description,
                        date:info.publishedAt,
                        picture:info.thumbnails.medium.url,
                        url:params.channelUrl,
                        subscriber:statistics.subscriberCount,
                        comment:statistics.commentCount,
                        video:statistics.videoCount,
                    });
                });
            });
        });
    }
    return null;
};