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
    return JSON.parse(action.data);
};