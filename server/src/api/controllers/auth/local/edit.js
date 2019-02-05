'use strict';

const utils = require('../common/utils');
const User = require('../../../models/auth/User.js');
const _ = require('lodash');

exports.editPassword = async function (req) {
    let done = null;
    if (!req.user || req.user === undefined)
        return utils.returnError(done, false, "Your are not connected");
    if (req.body.password === undefined || req.body.oldPassword === undefined)
        return utils.returnError(done, false, "No password given");
    if (!req.user.local || req.user.local === undefined || String(req.user.local) === "null") {
        return utils.returnError(done, false, "You haven't got any local account");
    }
    let findedUser = await User.findOne({'_id': req.user.id});
    if (findedUser) {
        if (!findedUser.validPassword(req.body.oldPassword))
            return utils.returnError(done, false, "Incorrect password");
        let password = findedUser.generateHash(req.body.password);
        if (findedUser.local.password === password)
            return utils.returnError(done, false, "Old and new passwords are same");
        findedUser.local.password = password;
        let ret = await findedUser.save();
        if (password === ret.local.password)
            return utils.returnSuccess(done, findedUser);
        else
            return utils.returnError(done, false, "Problems occurs when you try to change password");
    } else
        return utils.returnError(done, false,
            "User not found");
};

exports.editMail = async function (req) {
    let done = null;
    if (!req.user || req.user === undefined)
        return utils.returnError(done, false, "Your are not connected");
    if (req.body.email === undefined)
        return utils.returnError(done, false, "No email given");
    if (!req.user.local || req.user.local === undefined || String(req.user.local) === "null") {
        return utils.returnError(done, false, "You haven't got any local account");
    }
    let findedUser = await User.findOne({'_id': req.user.id});
    if (findedUser) {
        let email = req.body.email;
        if (findedUser.local.email === email)
            return utils.returnError(done, false, "Old and new emails are same");
        findedUser.local.email = email;
        let ret = await findedUser.save();
        if (email === ret.local.email)
            return utils.returnSuccess(done, findedUser);
        else
            return utils.returnError(done, false, "Problems occurs when you try to change Email");
    } else
        return utils.returnError(done, false,
            "User not found");
};