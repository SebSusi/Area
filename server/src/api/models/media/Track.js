'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Track = mongoose.Schema({
    ownerId: {type: Schema.Types.ObjectId, ref: 'User'},
    url: String,
    Name: String,
    Artists: [String],
    Albums: [String],
    Film: [String],
    shared: Boolean
});

module.exports = mongoose.model('Track', Track);