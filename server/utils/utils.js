exports.getParam = (req, params) => {

    if (!(params instanceof Array)) params = [params];

    for (let idx in params) {
        let param = params[idx];
        if (req.query[param]) return req.query[param];
        if (req.query[param.toUpperCase()]) return req.query[param.toUpperCase()];
        if (req.query[param.toLowerCase()]) return req.query[param.toLowerCase()];

        if (req.body[param]) return req.body[param];
        if (req.body[param.toUpperCase()]) return req.body[param.toUpperCase()];
        if (req.body[param.toLowerCase()]) return req.body[param.toLowerCase()];

        if (req.params[param]) return req.params[param];
        if (req.params[param.toUpperCase()]) return req.params[param.toUpperCase()];
        if (req.params[param.toLowerCase()]) return req.params[param.toLowerCase()];
    }
    return '';
}

exports.addSeconds = (seconds) => {
    let date = new Date();
    return new Date(date.setSeconds(date.getSeconds() + seconds));
};

exports.addMinutes = (minutes) => {
    let date = new Date();
    return new Date(date.setMinutes(date.getMinutes() + minutes));
};

exports.addMonths = (months) => {
    let date = new Date();
    return new Date(date.setMonth(date.getMonth() + months));
};

exports.addHours = (hours) => {
    let date = new Date();
    return new Date(date.setHours(date.getHours() + hours));
};

exports.parseDate = (date) => {
    return date.toISOString().replace(/T/, '_').replace(/\..+/, '');
}

exports.sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

exports.cleanObject = obj => {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj
};
