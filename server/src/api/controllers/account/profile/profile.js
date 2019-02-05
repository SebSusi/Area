'use strict';
const _ = require('lodash');

exports.getProfile = async function (req, type) {
    if (!req.user)
        return {'success': false};
    let profile = {
        'success': true,
        'id': req.user.id,
        'displayName': req.user.displayName,
        'currentConnectionType': req.user.currentConnectionType
    };
    if (type === 'facebook' || type === 'all' || (type === 'current' && req.user.currentConnectionType === 'facebook'))
        _.assign(profile, {'facebook': await getFacebookProfile(req)});
    if (type === 'google' || type === 'all' || (type === 'current' && req.user.currentConnectionType === 'google'))
        _.assign(profile, {'google': await getGoogleProfile(req)});
    if (type === 'local' || type === 'all' || (type === 'current' && req.user.currentConnectionType === 'local'))
        _.assign(profile, {'local': await getLocalProfile(req)});
    return profile
};

async function getGoogleProfile(req) {
    if (!req.user || !req.user.google || req.user.google === undefined)
        return {};
    return {
        'name': req.user.google.name,
        'email': req.user.google.email
    };
}

async function getFacebookProfile(req) {
    if (!req.user || !req.user.facebook || req.user.facebook === undefined)
        return {};
    return {
        'name': req.user.facebook.name,
        'email': req.user.facebook.email
    };
}

async function getLocalProfile(req) {
    if (!req.user || !req.user.local || req.user.local === undefined)
        return {};
    return {
        'username': req.user.local.username,
        'email': req.user.local.email
    };
}