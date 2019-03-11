const utils = require('../../../../controllers/area/widget/utils.js');

function dateDiff(t1, t2) {
    return Math.round(Math.abs((t1.getTime() - t2.getTime()) / 1000));
}

function toSeconds(hms) {
    var a = hms.split(':');
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
}

exports.checkData = async function(action, actionInfo, account) {
    date = await utils.getActionData(action);
    newDate = new Date();
    if (date === null || dateDiff(newDate, new Date(date)) >= toSeconds(action.params.duration)) {
        await utils.saveActionData(action, newDate.toString());
        return true;
    }
    return false;
};

exports.getOutput = async function(action, actionInfo, account) {
    console.log('Oui !');
    return {date: new Date().toString()};
};