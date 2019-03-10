'use strict';

const mongoose = require('mongoose');


let Account = mongoose.Schema({
    ownerId: String,
    type : String,
    name : String,
    data : String,
});

module.exports = mongoose.model('Account', Account);