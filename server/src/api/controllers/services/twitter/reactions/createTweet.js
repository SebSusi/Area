const Twitter = require('twitter');
const http = require('http');

async function uploadImage(data, client) {
    return new Promise(function (resolve, reject) {
        client.post(
            'media/upload',
            {media: data},
            function (error, media, response) {
                if (error)
                    resolve(null);
                else
                    resolve(media.media_id_string);
            }
        );
    });
}

async function getImage(url, client) {
    return new Promise(function (resolve, reject) {
        var req = http.request(url, function (res) {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                resolve(null);
            }
            const bufs = [];
            res.on('data', function (chunk) {
                bufs.push(chunk);
            });
            res.on('end', function () {
                const data = Buffer.concat(bufs);
                const media = uploadImage(data, client);
                resolve(media);
            });
        });
        req.on('error', function (err) {
            resolve(null);
        });
        req.end();
    });
}

exports.doReaction = async function (reaction, reactionInfo, parsedParams, account) {
    const client = new Twitter({
        consumer_key: 'aniiz8uwHB44Dg0eR30WSglYv',
        consumer_secret: 'YhhlA7u2iRZy2Rn7r4Q3Q54kR1r8iPgYRjoPQ8GRL8nxFe0q0Z',
        access_token_key: account.accessToken,
        access_token_secret: account.secret
    });
    const medias = [parsedParams.media1, parsedParams.media2, parsedParams.media3, parsedParams.media4];
    const ids = [];
    for (const media of medias) {
        try {
            ids.push(await getImage(media, client));
        } catch (e) {
        }
    }
    client.post('statuses/update', {
        status: parsedParams.message,
        media_ids: ids.join(',')
    }, function (error, tweet, response) {
        if (error)
            console.log(error);
        else
            console.log('New Tweet !');
    });
};