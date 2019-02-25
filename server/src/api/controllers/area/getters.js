const Area = require('../../models/area/Area');

exports.getArea = async function (id) {
    let findArea = await Area.findOne({'_id': id});
    if (findArea === false)
        return false;
    return findArea;
};