'use strict';

const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../../../models/auth/User.js');
const configAuth = require('../../../config/auth');
const utils = require('../common/utils');

passport.use('facebook-token-login', new FacebookTokenStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        passReqToCallback: configAuth.facebookAuth.passReqToCallback
    },
    function (req, token, refreshToken, profile, done) {
        process.nextTick(function () {
            if (!req.user) {
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    if (err)
                        return utils.returnError(done, false, err);
                    if (user) {
                        if (!user.facebook.token || user.facebook.token !== token) {
                            return updateUserData(user, token, profile, done);
                        } else
                            return utils.generateTokenAndReturn(done, user, 'facebook');
                    } else {
                        if (err)
                            return utils.returnError(done, false, err);
                        User.findOneByEmail(profile.emails[0].value, function (err, user) {
                            if (!user) {
                                return addNewUser(token, profile, done);
                            } else
                                return utils.returnError(done, false, "User with email already exist");
                        });
                    }
                });
            } else {
                return linkUser(req.user, token, profile, done);
            }
        });
    })
);

let addNewUser = function (token, profile, done) {
    let newUser = new User();
    newUser.facebook.id = profile.id;
    newUser.facebook.token = token;
    newUser.facebook.name = profile.displayName;
    newUser.displayName = profile.displayName;
    newUser.facebook.email = profile.emails[0].value;
    newUser.save(function (err) {
        if (err)
            return utils.returnError(done, false, err);
        return utils.generateTokenAndReturn(done, newUser, 'facebook');
    });
};

let updateUserData = function (user, token, profile, done) {
    user.facebook.token = token;
    user.facebook.name = profile.displayName;
    if (user.facebook.email === profile.emails[0].value)
        user.save(function (err) {
            if (err)
                return utils.returnError(done, false, err);
            return utils.generateTokenAndReturn(done, user, 'facebook');
        });
    else {
        User.findOneByEmail(profile.emails[0].value, function (err, findedUser) {
            if (!findedUser || findedUser === user) {
                user.facebook.email = profile.emails[0].value;
                user.save(function (err) {
                    if (err)
                        return utils.returnError(done, false, err);
                    return utils.generateTokenAndReturn(done, user, 'facebook');
                });
            }
            return utils.returnError(done, false,
                "Another user has your mail, please contact us to merge or delete account");
        });
    }
};

let linkUser = function (user, token, profile, done) {
    User.findOneByEmail(profile.emails[0].value, function (err, findedUser) {
        if (!findedUser || findedUser.id === user.id) {
            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name = profile.displayName;
            user.facebook.email = profile.emails[0].value;
            user.save(function (err) {
                if (err)
                    return utils.returnError(done, false, err);
                return utils.returnSuccess(done, user);
            });
        } else {
            return utils.returnError(done, false,
                "Another user has your mail, please contact us to merge or delete account");
        }
    });
};

require('../initAuth')(User, passport);

module.exports = passport;