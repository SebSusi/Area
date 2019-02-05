'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Room = mongoose.Schema({
    ownerId: {type: Schema.Types.ObjectId, ref: 'User'},
    admins: [{type: Schema.Types.ObjectId, ref: 'User'}],
    moderators: [{type: Schema.Types.ObjectId, ref: 'User'}],
    players: [{user: {type: Schema.Types.ObjectId, ref: 'User'}, currentRoundPoints: Number, points: Number, pings: Number}],
    bannedUsers: [{user: {type: Schema.Types.ObjectId, ref: 'User'}, reason: String, startDate: Date, time: Number}],
    playlist: [{type: Schema.Types.ObjectId, ref: 'Playlist'}],
    usedTracks: [{type: Schema.Types.ObjectId, ref: 'Track'}],
    currentTrack: {type: Schema.Types.ObjectId, ref: 'Track'},
    currentRound: Number,
    maxRound: Number,
});

module.exports = mongoose.model('Room', Room);