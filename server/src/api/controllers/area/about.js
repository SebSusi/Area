const _ = require('lodash');
const schemaGetter = require('../../models/widget/schemaGetter');
const widgetConfig = require('../../config/widgets');
const moment = require('moment');


function getActionReactionAbout(object, type) {
    let about = {
        name: object.name,
        description: object.description,
        fields: object.fields,
    };
    if (type === 'actions')
        about.output = object.output;
    else if (type === 'reactions')
        about.input = object.input;
    return about;
}

function getServiceAbout(service) {
    let actions = [];
    let reactions = [];

    service.actions.forEach(function (action) {
        actions.push(getActionReactionAbout(action, 'actions'));
    });
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

module.exports.sendAbout = async function (req, res) {
    try {
        res.json(await exports.getAbout(req));
    } catch (e) {
        res.json({success: false})
    }
};
