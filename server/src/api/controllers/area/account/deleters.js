const widgetsConfig = require('../../../config/widgets');
const accountGetter = require('./getters');

async function save(widget) {
    let save = await widget.save(function (err, object) {
        if (err)
            return false;
        return object;
    });
    if (save === false)
        return false;
    return widget;
}

async function deleteAccountFromWidgetWithModel(model, accountId) {
    let widgets = await model.find({'account.id': accountId});
    if (widgets === null || widgets === undefined)
        return;
    for (let i = 0; i < widgets.length; i++) {
        let widget = widgets[i];
        if (widget.account != null && widget.account.id === accountId) {
            widget.account = null;
            await save(widget);
        }
    }
}

async function deleteAccountFromWidgetsWithAccountType(accountType, accountId) {
    let services = Object.keys(widgetsConfig);
    services.forEach(function (service) {
        if (_.hasIn(widgetsConfig, service + "." + "actions")) {
            widgetsConfig[service].actions.forEach(async function (element) {
                if (element.accountType === accountType)
                    await deleteAccountFromWidgetWithModel(element.model, accountId);
            });
        }
        if (_.hasIn(widgetsConfig, service + "." + "reactions")) {
            widgetsConfig[service].reactions.forEach(async function (element) {
                if (element.accountType === accountType)
                    await deleteAccountFromWidgetWithModel(element.model, accountId);
            });
        }
    });
}

exports.deleteAccount = async function (user, accountType, accountId) {
    let account = accountGetter.getAccountById(user, accountId);
    if (account === false)
        return {success: false};
    await deleteAccountFromWidgetsWithAccountType(accountType, accountId);
    await await account.remove();
    return {success: true}
};