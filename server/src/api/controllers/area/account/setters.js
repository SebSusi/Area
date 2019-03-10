const accountModel = require('../../../models/account/Account');
const _ = require('lodash');

async function save(account) {
    let save = await account.save(function (err, object) {
        if (err)
            return false;
        return object;
    });
    if (save === false)
        return false;
    return account;
}

exports.addAccount = async function (req) {
    if (req.body.data === undefined || req.body.type === undefined || req.body.name === undefined)
        return {success: false};
    let newAccount = new accountModel();
    newAccount.ownerId = req.user.id;
    newAccount.type = req.body.type;
    newAccount.name = req.body.name;
    newAccount.data = JSON.stringify(req.body.data);
    let account = await save(newAccount);
    if (account === false)
        return {success: false};
    return {success: true, id: account.id}
};