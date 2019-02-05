const utils = require('./utils');
const User = require('../../../models/auth/User.js');
const _ = require('lodash');

exports.deleteAuth = async function (req, res, type) {
    let done = null;
    if (!req.user || req.user === undefined)
        return utils.returnError(done, false, "Your are not connected");
    if (!req.user[type] || req.user[type] === undefined || String(req.user[type]) === "null") {
        return utils.returnError(done, false, "This type of connection is not linked");
    }
    if (type === req.user.currentConnectionType)
        return utils.returnError(done, false, "You can't unlink your current used connection type");
    let findedUser = await User.findOne({'_id': req.user.id});
    if (findedUser) {
        _.set(findedUser, type, null);
        let ret = await findedUser.save();
        if (String(_.get(ret[type])) === "undefined")
            return utils.returnSuccess(done, findedUser);
        else
            return utils.returnError(done, false, "Problems occurs when unlink");
    } else
        return utils.returnError(done, false,
            "User not found");
};