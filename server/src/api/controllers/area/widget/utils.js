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
    action.data = data;
    return await save(action);
};