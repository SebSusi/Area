'use strict';

const mongoose = require('mongoose');


let Area = mongoose.Schema({
    ownerId: {},
    action: {
        id: String,
        name: String,
        serviceName: String,
    },
    reaction: [
        {
            id: String,
            name: String,
            serviceName: String,
        },
    ]
});

module.exports = mongoose.model('Area', Area);