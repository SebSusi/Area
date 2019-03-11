'use strict';

const YouTube = require('better-youtube-api').YouTube;
const _ = require('lodash');
const apiKeys = require('../../../../config/apiKeys');
const request = require('request');
const utils = require('../../../../controllers/area/widget/utils.js');

async function getYoutubeChannelId(action) {
    const params = action.params;
    let youtubedata = null;
    const youtubeApi = new YouTube(apiKeys.youtube.apiKey);
    if (params.videoUrl != null) {
        await youtubeApi.getVideoByUrl(params.videoUrl)
            .then(function (video) {
                //console.log(video.data);
                switch (params.type) {
                    case 0:
                        youtubedata = video.data.statistics.likeCount;
                        break;
                    case 1:
                        youtubedata = video.data.statistics.dislikeCount;
                        break;
                    case 2:
                        youtubedata = video.data.statistics.commentCount;
                        break;
                    case 3:
                        youtubedata = video.data.statistics.viewCount;
                        break;

                }
            })
            .catch(function (err) {
                youtubedata = false
            });
    }
    return new Promise(function (resolve, reject) {
        if (!youtubedata)
            reject(false);
        resolve(utils.compareActionData(action, youtubedata));
    });
}
exports.checkData = async function(action, actionInfo, account) {
    return getYoutubeChannelId(action);
};

exports.getOutput = async function (action, actionInfo, account) {
    const params = action.params;
    let youtubedata = null;
    let stat = null;
    const youtubeApi = new YouTube(apiKeys.youtube.apiKey);
    await youtubeApi.getVideoByUrl(params.videoUrl)
        .then(function (video) {
            stat = video.data.statistics;
            youtubedata = video.data.snippet;
        })
        .catch(function (err) {
            youtubedata = false
        });
    return new Promise(function (resolve, reject) {
        if (!youtubedata)
            reject(false);
        resolve({
            title: youtubedata.title,
            channel: youtubedata.channel,
            description: youtubedata.description,
            date: youtubedata.publishedAt,
            picture: youtubedata.thumbnails.default.url,
            url: params.videoUrl,
            like: stat.likeCount,
            dislike: stat.dislikeCount,
            comment: stat.commentCount,
            view: stat.viewCount
        });
    });
    return null;
};