'use strict';

const YouTube = require('better-youtube-api').YouTube;
const _ = require('lodash');
const apiKeys = require('../../../../config/apiKeys');
const request = require('request');
const utils = require('../../../../controllers/area/widget/utils.js');

async function getYoutubeChannelId(action, url) {
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
        return new Promise(function (resolve, reject) {
            request(url, function (err, response, body) {
                if (err)
                    reject(false);
                body = JSON.parse(body);
                id = body.items[0].id;
                let url2 = `https://www.googleapis.com/youtube/v3/search?key=${apiKeys.youtube.apiKey}&channelId=${id}&part=snippet,id&order=date&maxResults=1`;
                request(url2, function (err, response, body) {
                    body = JSON.parse(body);
                    if (err)
                        reject(false);
                    try {
                        resolve(utils.compareActionData(action, body.items[0].id.videoId));
                    }
                    catch (e) {
                        resolve(false);
                    }
                });
            });
        });
    }
};
exports.checkData = async function(action, actionInfo, account) {
    const params = action.params;
    return getYoutubeChannelId(action, params.channelUrl);
};

exports.getOutput = async function (action, actionInfo, account) {
    const params = action.params;
    const data = await utils.getActionData(action);
    let youtubedata = null;
    const youtubeApi = new YouTube(apiKeys.youtube.apiKey);
    if (data != null) {
        await youtubeApi.getVideoByUrl('https://www.youtube.com/watch?v=' + data)
            .then(function (video) {
                youtubedata = video.data.snippet;
            })
            .catch(function (err) {
                youtubedata = false
            });
    }
    return new Promise(function (resolve, reject) {
        if (!data || !youtubedata)
            reject(false);
        resolve({
            title: youtubedata.title,
            channel: youtubedata.channel,
            description: youtubedata.description,
            date: youtubedata.publishedAt,
            picture:youtubedata.thumbnails.default.url
            });
    });
};