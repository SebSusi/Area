'use strict';

const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require('../../../models/auth/User.js');
const configAuth = require('../../../config/auth');
const utils = require('../common/utils');

passport.use('google-token-login', new GoogleTokenStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        passReqToCallback: configAuth.googleAuth.passReqToCallback
    },
    function (req, token, refreshToken, profile, done) {
        process.nextTick(function () {
            if (!req.user) {
                User.findOne({'google.id': profile.id}, function (err, user) {
                    if (err)
                        return utils.returnError(done, false, err);
                    if (user) {
                        if (!user.google.token || user.google.token !== token) {
                            return updateUserData(user, token, profile, done);
                        } else
                            return utils.generateTokenAndReturn(done, user, 'google');
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
    newUser.google.id = profile.id;
    newUser.google.token = token;
    newUser.google.name = profile.displayName;
    newUser.displayName = profile.displayName;
    newUser.google.email = profile.emails[0].value;
    newUser.save(function (err) {
        if (err)
            return utils.returnError(done, false, err);
        return utils.generateTokenAndReturn(done, newUser, 'google');
    });
};

let updateUserData = function (user, token, profile, done) {
    user.google.token = token;
    user.google.name = profile.displayName;
    if (user.google.email === profile.emails[0].value)
        user.save(function (err) {
            if (err)
                return utils.returnError(done, false, err);
            return utils.generateTokenAndReturn(done, user, 'google');
        });
    else {
        User.findOneByEmail(profile.emails[0].value, function (err, findedUser) {
            if (!findedUser || findedUser === user) {
                user.google.email = profile.emails[0].value;
                user.save(function (err) {
                    if (err)
                        return utils.returnError(done, false, err);
                    return utils.generateTokenAndReturn(done, user, 'google');
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
            user.google.id = profile.id;
            user.google.token = token;
            user.google.name = profile.displayName;
            user.google.email = profile.emails[0].value;
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