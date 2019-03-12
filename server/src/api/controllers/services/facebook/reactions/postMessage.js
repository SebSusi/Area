var FB = require('fb');
var graph = require('fbgraph');

exports.doReaction = async function (reaction, reactionInfo, parsedParams, account) {
    console.log(parsedParams);
    graph.setAccessToken(account.access_token);
    FB.setAccessToken(account.accessToken);
    FB.options({ version: 'v2.4' });
    graph.post("/feed", parsedParams, function (err, res) {
        console.log(res); // { id: xxxxx}
    });
    FB.api('me/feed', 'post', { message: parsedParams.message }, function (res) {
        if (!res || res.error) {
            console.log(!res ? 'error occurred' : res.error.message);
            return;
        }
        console.log('Post Id: ' + res.id);
    });
};