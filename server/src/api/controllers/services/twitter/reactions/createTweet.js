const http = require('http');
const Twitter = require('twitter');

async function uploadFile(mediaUrl, client) {
    const requestSettings = { method: 'GET', url: mediaUrl};
    request(requestSettings, function(error, response, body) {
        // Use body as a binary Buffer
    });
    return http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
        console.log(response);
        resolve(true);
//        response.pipe(file);
    });
};

exports.doReaction = async function(reaction, reactionInfo, parsedParams, account) {
    const client = new Twitter({
        consumer_key: 'aniiz8uwHB44Dg0eR30WSglYv',
        consumer_secret: 'YhhlA7u2iRZy2Rn7r4Q3Q54kR1r8iPgYRjoPQ8GRL8nxFe0q0Z',
        access_token_key: account.accessToken,
        access_token_secret: account.secret
    });
    const medias = [parsedParams.media1, parsedParams.media2, parsedParams.media3, parsedParams.media4];
    for (const media of medias) {

        if (media)
            await uploadFile(media, client);
    }

//    client.post('statuses/update', {status: parsedParams.message},  function(error, tweet, response) {});
};