const Twitter = require('twitter');
const utils = require('../../../../controllers/area/widget/utils.js');

exports.checkData = async function(action, actionInfo, account) {
    const params = action.params;
    const client = new Twitter({
        consumer_key: 'aniiz8uwHB44Dg0eR30WSglYv',
        consumer_secret: 'YhhlA7u2iRZy2Rn7r4Q3Q54kR1r8iPgYRjoPQ8GRL8nxFe0q0Z',
        access_token_key: account.accessToken,
        access_token_secret: account.secret
    });
    var tparams = { screen_name: params.username };
    return new Promise(async function (resolve, reject) {

        client.get('statuses/user_timeline', tparams, async function (error, tweets, response) {
            if (error)
                reject(false);
            resolve(await utils.compareActionData(action, tweets[0].id));
        });
    });
};

exports.getOutput = async function (action, actionInfo, account) {
    const params = action.params;
    const client = new Twitter({
        consumer_key: 'aniiz8uwHB44Dg0eR30WSglYv',
        consumer_secret: 'YhhlA7u2iRZy2Rn7r4Q3Q54kR1r8iPgYRjoPQ8GRL8nxFe0q0Z',
        access_token_key: account.accessToken,
        access_token_secret: account.secret
    });
    var tparams = { screen_name:  params.username};
    return new Promise(async function (resolve, reject) {

        client.get('statuses/user_timeline', tparams, async function (error, tweets, response) {
            if (error)
                reject(false);
            let data = tweets[0];
            resolve({
                text:data.text,
                username:data.user.name,
                date:data.created_at,
                picture_user:data.user.profile_image_url
            });
        });
    });
};