async function save(widget) {
    return await widget.save(function (err, object) {
        if (err)
            return false;
        return object;
    });
}

exports.saveActionData = async function (action, data) {
    action.data = data;
    return await save(action);
};