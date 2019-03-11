const moment = require('moment');
const utils = require('../../../../controllers/area/widget/utils.js');

exports.checkData = async function(action, actionInfo, account) {
    date = await utils.getActionData(action);
    newDate = new Date();
    hour = moment(action.params.time, "HH:mm:ss");
    newHour = moment(newDate.toTimeString(), "HH:mm:ss");

    if (date === null || (date.getDay() !== newDate.getDay() && newHour.isSameOrAfter(hour))) {
        await utils.saveActionData(action, newDate.toString());
        return true;
    }
    return false;
};

exports.getOutput = async function(action, actionInfo, account) {
    date = new Date();
    return {
        dayName: date.toLocaleString('en-us', {  weekday: 'long' }),
        monthName: date.toLocaleString('en-us', { month: 'long' }),
        year: date.getFullYear(),
        month : date.getMonth(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    };
};