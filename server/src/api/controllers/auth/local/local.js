'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/auth/User.js');
const configAuth = require('../../../config/auth');
const utils = require('../common/utils');

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({'local.email': email}, function (err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return utils.returnError(done, false, 'Authentication failed. User not found.');
                if (!user.validPassword(password))
                    return utils.returnError(done, false, 'Authentication failed. Passwords did not match.');
                else
                    return utils.generateTokenAndReturn(done, user, 'local');
            });
        });
    })
);

passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            if (!req.user) {
                User.findOneByEmail(email, function (err, user) {
                    if (!user) {
                        return addNewUser(email, req.body.username, password, done);
                    } else
                        return utils.returnError(done, false, "User with email already exist");
                });
            } else {
                return utils.returnError(done, false, "You mustn't be logged");
            }
        });
    })
);

let addNewUser = function (email, username, password, done) {
    let newUser = new User();
    newUser.local.email = email;
    newUser.local.password = newUser.generateHash(password);
    if (username === undefined || !username)
        return utils.returnError(done, false, 'No username given');
    newUser.local.username = username;
    newUser.displayName = username;
    newUser.save(function (err) {
        if (err)
            return utils.returnError(done, false, err);
        return utils.generateTokenAndReturn(done, newUser, 'local');
    });
};

passport.use('local-link', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            if (req.user) {
                return linkUser(req.user, email, password, done);
            } else {
                return utils.returnError(done, false, "You must be logged");
            }
        });
    })
);

let linkUser = function (user, email, password, done) {
    User.findOneByEmail(email, function (err, findedUser) {
        if (!findedUser || findedUser.id === user.id) {
            user.local.email = email;
            user.local.password = user.local.password = user.generateHash(password);
            user.local.username = user.local.displayName;
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