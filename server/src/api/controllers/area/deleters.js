const widgetDeleters = require('../../controllers/area/widget/deleters');
const widgetGetters = require('../../controllers/area/widget/getters');

exports.deleteArea = async function (req, area) {
    if (area === false)
        return {success: false};
    if (area.action !== null && area.action !== undefined && String(area.action) !== "{}")
        await widgetDeleters.deleteActionWithoutSaveArea(await widgetGetters.getActionWidgetByAreaAction(area.action));
    if (area.reactions !== null && area.reactions !== undefined && String(area.reactions) !== "{}")
        for (let i = 0; i < area.reactions.length; i++) {
            let reaction = area.reactions[i];
            if (reaction !== null && reaction !== undefined && reaction !== {})
                await widgetDeleters.deleteReactionWithoutSaveArea(
                    await widgetGetters.getReactionWidgetByAreaReaction(reaction));
        }
    let status = await area.remove();
    if (status !== false && status !== null && status !== undefined)
        return {success: true};
    return {success: false};
};