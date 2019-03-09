const widgetDeleters = require('../../controllers/area/widget/deleters');

exports.deleteArea = async function (req, area) {
    if (area === false)
        return {success: false};
    if (area.action !== null && area.action !== undefined && area.action !== {})
        await widgetDeleters.deleteActionWithoutSaveArea(area.action);
    for (let i = 0; i < area.reactions.length; i++) {
        let reaction = area.reactions[i];
        if (reaction !== null && reaction !== undefined && reaction !== {})
            await widgetDeleters.deleteReactionWithoutSaveArea(reaction);
    }
    return await area.remove(async function (err) {
        return {success : err}
    });
};