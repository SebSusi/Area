'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Playlist = mongoose.Schema({
    ownerId: {type: Schema.Types.ObjectId, ref: 'User'},
    Tracks: [{type: Schema.Types.ObjectId, ref: 'Track'}],
    url: String,
    shared: Boolean
});

module.exports = mongoose.model('Playlist', Playlist);