'use strict';

const User = require('../../../models/auth/User.js');
const tokenGenerator = require('../jwtAuth');

exports.generateTokenAndReturn = function (done, user, connectionType) {
    return done(null, user, {
        success: true,
        token: 'JWT ' + tokenGenerator.generateJWT(user, connectionType)
    });
};

exports.returnSuccess = function (done, user) {
    if (done === undefined || done === null || done === false)
        return ({success: true});
    return done(null, user, {
        success: true,
    });
};

exports.returnError = function (done, user, message) {
    if (done === undefined || done === null || done === false)
        return ({success: false, message: message});
    return done(null, user, {success: false, message: message});
};

exports.editDisplayName = function (req, res, done) {
    if (!req.user || req.user === undefined)
        return this.returnError(done, false, "Your are not connected");
    if (!req.displayName || req.displayName === undefined)
        return this.returnError(done, false, "Please isset display name");
    User.findOne({'_id': req.user.id}, function (err, findedUser) {
        if (findedUser) {
            findedUser.displayName = req.displayName;
            findedUser.save(function (err) {
                if (err)
                    return exports.returnError(done, false, err);
                return exports.returnSuccess(done, findedUser);
            });
        }
        return utils.returnError(done, false,
            "User not found");
    });
};