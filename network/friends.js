var post = function (req, res, next) {
    next(req, res);
};

var get = function (req, res, next) {
    next(req, res);
};

module.exports = {
    post: post,
    get: get,
};