'use strict';

const YouTube = require('better-youtube-api').YouTube;
const _ = require('lodash');
const apiKeys = require('../../../../config/apiKeys');
const request = require('request');
const utils = require('../../../../controllers/area/widget/utils.js');
const global = require('../global');

async function getYoutubeChannelId(action, url) {
    const params = action.params;
    let username = global.getusernameInUrl(params.channelUrl);
    if (username) {
        let url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=${username}&key=${apiKeys.youtube.apiKey}`;
        return new Promise(async function (resolve, reject) {
            request(url, async function (err, response, body) {
                if (err)
                    reject(false);
                body = JSON.parse(body);
                let id = body.items[0].id;
                let url2 = `https://www.googleapis.com/youtube/v3/search?key=${apiKeys.youtube.apiKey}&channelId=${id}&part=snippet,id&order=date&maxResults=1`;
                request(url2, async function (err, response, body) {
                    body = JSON.parse(body);
                    if (err)
                        reject(false);
                    try {
                        resolve(await utils.compareActionData(action, body.items[0].id.videoId));
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
                console.log(video.data);
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
            channel: youtubedata.channelTitle,
            description: youtubedata.description,
            date: youtubedata.publishedAt,
            picture:youtubedata.thumbnails.default.url,
            url:'https://www.youtube.com/watch?v=' + data
            });
    });
};