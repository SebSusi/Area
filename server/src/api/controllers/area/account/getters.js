const accountModel = require('../../../models/account/Account');
const _ = require('lodash');

exports.getAccountsByType = async function (user, accountType) {
    let accounts = await accountModel.find({'type': accountType, 'ownerId': user.id});
    if (accounts === false || accounts === null || accounts === [])
        return [];
    return accounts;
};

exports.getAccountById = async function (user, accountId) {
    let account = await accountModel.find({'_id': accountId, 'ownerId': user.id});
    if (account === false || account === null)
        return false;
    return account;
};

exports.getAccounts = async function (user) {
    let accounts = await accountModel.find({'ownerId': user.id});
    if (accounts === false || accounts === null || accounts === [])
        return [];
    return accounts;
};

exports.getFormattedAccountsByType = async function (user, accountType) {
    let accounts = await exports.getAccountsByType(user, accountType);
    let formattedAccounts = [];
    for (let i = 0; i < accounts.length; i++) {
        formattedAccounts.push({
            id: accounts[i].id,
            type: accounts[i].type,
            name: accounts[i].name,
        })
    }
    return formattedAccounts
};

exports.getFormattedAccountById = async function (user, accountId) {
    let account = await exports.getAccountById(user, accountId);
    return ({
        id: account.id,
        type: account.type,
    });
};

exports.getFormattedAccounts = async function (user) {
    let accounts = await exports.getAccounts(user);
    let formattedAccounts = [];
    for (let i = 0; i < accounts.length; i++) {
        formattedAccounts.push({
            id: accounts[i].id,
            type: accounts[i].type,
            name: accounts[i].name,
        })
    }
    return formattedAccounts
};