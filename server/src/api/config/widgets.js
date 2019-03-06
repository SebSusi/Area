'use strict';

const _ = require('lodash');
const modelGenerator = require('../models/widget/generator');

function generateWidgetsModel(widgetsConfig) {
    let services = Object.keys(widgetsConfig);
    services.forEach(function (service) {
        if (_.hasIn(widgetsConfig, service + "." + "actions")) {
            widgetsConfig[service].actions.forEach(function (element) {
                if (element.model === undefined)
                    element.model = modelGenerator(element.modelName, element.params)
            });
        }
        if (_.hasIn(widgetsConfig, service + "." + "reactions")) {
            widgetsConfig[service].reactions.forEach(function (element) {
                if (element.model === undefined)
                    element.model = modelGenerator(element.modelName, element.params)
            });
        }
    });
}

let widgets = function () {
    let widgetsConfig = {
        weather: {
            name: "weather",
            actions: [
                {
                    name: 'current',
                    description: 'Daily weather',
                    controller: require('../controllers/services/weather/actions/current'),
                    modelName: 'weatherCurrent',
                    params: {
                        city: {type: String, default: 'Nancy'},
                        country: {type: String, default: 'France'},
                    },
                    fields: [
                        {
                            type: "checkbox",
                            name: 'city',
                            label: 'City',
                            placeholder: 'Nancy',
                            options: [
                                {
                                    value: 1,
                                    label: 'Felicien'
                                },
                                {
                                    value: 2,
                                    label: 'Felicienne'
                                }
                            ],
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Name Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '\'^[a-zA-Z]+$\'',
                                    message: 'Accept only text'
                                },
                            ]
                        },
                    ],
                    output: {
                        temperature: {type: "Number", value: 10},
                    },
                },
            ],
            reactions: [],
        },
    };
    generateWidgetsModel(widgetsConfig);
    return widgetsConfig;
};


module.exports = widgets();