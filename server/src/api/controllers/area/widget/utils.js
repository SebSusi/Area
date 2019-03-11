async function save(widget) {
    let save = await widget.save(function (err, object) {
        if (err)
            return false;
        return object;
    });
    if (save === false)
        return false;
    return widget;
}

exports.saveActionData = async function (action, data) {
    action.data = JSON.stringify(data);
    return await save(action);
};

exports.getActionData = async function (action) {
    if (action.data === undefined || action.data === null)
        return null;
    return JSON.parse(action.data);
};

exports.compareActionData = async function (action, newData) {
    const lastData = await exports.getActionData(action);
    await exports.saveActionData(action, newData);
    return (lastData !== newData);
};