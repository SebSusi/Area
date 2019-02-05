const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../config/auth');
const User = require('../../models/auth/User.js');


exports.generateJWT = function (user, connectionType) {
    let token = jwt.sign(user.toJSON(), config.jwt.secretToken, {});
    user.token = token;
    user.currentConnectionType = connectionType;
    user.save();
    return token;
};

exports.deleteToken = function (req) {
    let token = req.header('Authorization').slice(4);
    User.findOne({token: token}, function (err, user) {
        if (!err && user) {
            user.token = null;
            user.currentConnectionType = null;
            user.save();
        }
    })
};

exports.canAuth = function (req, res, next) {
    passport.authenticate('jwt', {session: false}, function (error, decryptToken, jwtError) {
        if (typeof (jwtError) === 'object') {
            /*if (jwtError.name === "TokenExpiredError")
                jwtBlacklist.deleteOne({token: req.header('Authorization').slice(4)}).lean().exec();*/
            return next();
        } else if (!error) {
            let token = req.header('Authorization').slice(4);
            if (token === null || token === undefined) {
                req.user = false;
                return next();
            }
            else
                User.findOne({token: token}, function (err, user) {
                    if (!err && user) {
                        req.user = user;
                        return next();
                    }
                });
        }
    })(req, res, next);
};

exports.requireAuth = function (req, res, next) {
    passport.authenticate('jwt', {session: false}, function (error, decryptToken, jwtError) {
        if (typeof (jwtError) === 'object') {
            /*if (jwtError.name === "TokenExpiredError")
                jwtBlacklist.deleteOne({token: req.header('Authorization').slice(4)}).lean().exec();*/
            return res.json({
                success: false,
                field: 'Authorization',
                message: jwtError.message
            });
        } else if (!error) {
            let token = req.header('Authorization').slice(4);
            if (token === null || token === undefined)
                res.json({
                    success: false,
                    field: 'Authorization',
                    message: 'token cannot be null'
                });
            else
                User.findOne({token: token}, function (err, user) {
                    if (!err && user) {
                        req.user = user;
                        return next();
                    }
                });
        }
    })(req, res, next);
};