'use strict'

exports.getusernameInUrl = function(channelUrl){
    let url = channelUrl;
    let id = '';
    let username = false;
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
    return username;
}