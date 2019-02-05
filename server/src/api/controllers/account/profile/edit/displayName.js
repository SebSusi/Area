const utils = require('../../../auth/common/utils');
const User = require('../../../../models/auth/User.js');

exports.editDisplayName = async function (req) {
    let done = null;
    if (!req.user || req.user === undefined)
        return utils.returnError(done, false, "Your are not connected");
    if (req.body.displayName === undefined)
        return utils.returnError(done, false, "No display name given");
    let findedUser = await User.findOne({'_id': req.user.id});
    if (findedUser) {
        let displayName = req.body.displayName;
        if (findedUser.displayName === displayName)
            return utils.returnError(done, false, "Old and new display names are same");
        findedUser.displayName = displayName;
        let ret = await findedUser.save();
        if (displayName === ret.displayName)
            return utils.returnSuccess(done, findedUser);
        else
            return utils.returnError(done, false, "Problems occurs when you try to change your display name");
    } else
        return utils.returnError(done, false,
            "User not found");
};