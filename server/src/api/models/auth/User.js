'use strict';

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const Schema = mongoose.Schema;


let User = mongoose.Schema({
    local: {
        email: String,
        password: String,
        username: String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    displayName: String,
    currentConnectionType: String,
    token: String,
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

User.statics.findOneByEmail = function (email, cb) {
    this.findOne({
        $or: [
            {'google.email': email},
            {'local.email': email},
            {'facebook.email': email}
        ]
    }, cb)
};

module.exports = mongoose.model('User', User);