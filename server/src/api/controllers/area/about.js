const _ = require('lodash');
const schemaGetter = require('../../models/widget/schemaGetter');
const widgetConfig = require('../../config/widgets');
const moment = require('moment');


function getActionReactionAbout(object, type) {
    let accountType = null;
    if (object.accountType !== undefined && object.accountType !== null)
        accountType = object.accountType;
    let about = {
        name: object.name,
        accountType: accountType,
        description: object.description,
        fields: object.fields,
        outputs: object.outputs,
    };
    if (type === 'actions')
        about.output = object.output;
    return about;
}

function getServiceAbout(service) {
    let actions = [];
    let reactions = [];

    if (service.actions !== undefined)
        service.actions.forEach(function (action) {
            actions.push(getActionReactionAbout(action, 'actions'));
        });
    if (service.reactions !== undefined)
        service.reactions.forEach(function (reaction) {
            reactions.push(getActionReactionAbout(reaction, 'reactions'));
        });
    return {
        name: service.name,
        actions: actions,
        reactions: reactions
    }
}

module.exports.getAbout = async function (req) {
    let services = Object.keys(widgetConfig);
    let serviceArray = [];

    if (req === undefined || req.ip === undefined)
        req = {
            ip: "client host"
        };
    services.forEach(function (service) {
        serviceArray.push(getServiceAbout(widgetConfig[service]));
    });
    return {
        client: {
            host: req.ip
        },
        server: {
            current_time: moment().unix(),
            services: serviceArray,
        }
    }
};

