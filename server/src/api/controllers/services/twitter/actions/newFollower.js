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
        client.get('followers/list', tparams, async function (error, resp, response) {
            if (error) {
                console.log(error);
                reject(false);
            }
            if (resp.users.length)
                resolve(await utils.compareActionData(action, resp.users[0].name));
            else
                resolve(false);
        });
    });
};

exports.getOutput = async function (action, actionInfo, account) {
    const client = new Twitter({
        consumer_key: 'aniiz8uwHB44Dg0eR30WSglYv',
        consumer_secret: 'YhhlA7u2iRZy2Rn7r4Q3Q54kR1r8iPgYRjoPQ8GRL8nxFe0q0Z',
        access_token_key: account.accessToken,
        access_token_secret: account.secret
    });
    var tparams = { screen_name: action.params.username };
    return new Promise(async function (resolve, reject) {
        client.get('followers/list', tparams, async function (error, resp, response) {
            if (error) {
                reject(null);
            }
            if (resp.users && resp.users.length) {
                const follower = resp.users[0];
                resolve({
                    name: follower.name,
                    screenName: follower.screen_name,
                    id: follower.id_str,
                    location: follower.location,
                    lang: follower.lang,
                    friendCount: follower.friends_count,
                    followersCount: follower.followers_count,
                    description: follower.description
                });
            } else
                resolve(null);
        });
    });
};