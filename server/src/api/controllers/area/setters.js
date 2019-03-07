const _ = require('lodash');
const area = require('../../models/area/Area');

exports.createArea = function (req){
    let newArea = new area();
    newArea.params = params;
    newArea.ownerId = req.user._id;
    newArea.name = req.body.name;
    newArea.activated = req.body.activated;
    newArea.timer = req.body.timer;
    newArea.save();
    return {id: newArea._id, success: true};
};