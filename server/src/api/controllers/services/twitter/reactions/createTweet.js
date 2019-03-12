const Twitter = require('twitter');
const http = require('http');


async function getImage(url, callback) {
    console.log('[' + url + ']');
    if (!url.length)
        callback(null, data);
    http.get(url, res => {
        const bufs = [];
        res.on('data', function (chunk) {
            bufs.push(chunk)
        });
        res.on('end', function () {
            const data = Buffer.concat(bufs);
            callback(null, data);
        });
    }).on('error', callback).catch((err) => {
        return Observable.throw(err)
    });
}

async function uploadFile(mediaUrls, client, nextImg, sender) {
    if (mediaUrls.length)
        getImage(mediaUrl[0], function (err, data) {
            nextImg({media_id: 1105153134995955700});
            /*              client.post(
                            'media/upload',
                            {media: data},
                            function(error, media, response) {
                                console.log(media);
                                callback(media);
                            }
                        );*/
        });
    else
        sender();
    /*    await base64Img.requestBase64(mediaUrl, function(err, res, body) {
    //        console.log(body);
            client.post('media/upload',
                { media_data: body.toString() }, function (err, data, response) {
                console.log(data);
            });
        });*/
}

async function customAlert(msg, client, ids, callback) {
    getImage(msg, function (err, data) {
        data = {media_id: 1105153134995955700};
        ids += data.media_id + ',';
        callback();
        /*              client.post(
                        'media/upload',
                        {media: data},
                        function(error, media, response) {
                            console.log(media);
                            callback(media);
                        }
                    );*/
    });
}

exports.doReaction = async function (reaction, reactionInfo, parsedParams, account) {
    const client = new Twitter({
        consumer_key: 'aniiz8uwHB44Dg0eR30WSglYv',
        consumer_secret: 'YhhlA7u2iRZy2Rn7r4Q3Q54kR1r8iPgYRjoPQ8GRL8nxFe0q0Z',
        access_token_key: account.accessToken,
        access_token_secret: account.secret
    });
/*    let ids='';
    const medias = [parsedParams.media1, parsedParams.media2, parsedParams.media3, parsedParams.media4];
    var x = 0;
    var loopThrewMedia = function () {
        customAlert(medias[x], client, ids, function () {
            x++;
            if (x < medias.length)
                loopThrewMedia();
            console.log(ids);
        });
    };

    loopThrewMedia();*/
    client.post('statuses/update', {status: parsedParams.message},  function(error, tweet, response) {});
};