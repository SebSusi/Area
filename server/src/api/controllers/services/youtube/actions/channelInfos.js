'use strict';

const YouTube = require('better-youtube-api').YouTube;
const _ = require('lodash');
const apiKeys = require('../../../../config/apiKeys');
const request = require('request');

async function getYoutubeChannelId(action) {
    const params = action.params;
    let youtubedata = null;
    const youtubeApi = new YouTube(apiKeys.youtube.apiKey);
    if (data != null) {
        await youtubeApi.getVideoByUrl(params.videoUrl)
            .then(function (video) {
                console.log(video.data);
                youtubedata = video.data.snippet;
            })
            .catch(function (err) {
                youtubedata = false
            });
    }
    return new Promise(function (resolve, reject) {
        if (!youtubedata)
            reject(false);
        resolve({
            title: youtubedata.title,
            channel: youtubedata.channel,
            description: youtubedata.description,
            date: youtubedata.publishedAt,
            picture:youtubedata.thumbnails.default.url
            });
    });
}
exports.checkData = async function(action, actionInfo, account) {
    return getYoutubeChannelId(action);
};

exports.getOutput = async function(action, actionInfo, account) {
    return null;
};