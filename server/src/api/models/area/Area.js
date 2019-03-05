'use strict';

const mongoose = require('mongoose');


let Area = mongoose.Schema({
    ownerId: {},
    name : String,
    activated: Boolean,
    timer: {type: Number, default: 0},
    action: {
        id: String,
        name: String,
        serviceName: String,
    },
    reactions: [
        {
            id: String,
            name: String,
            serviceName: String,
        },
    ]
});

module.exports = mongoose.model('Area', Area);