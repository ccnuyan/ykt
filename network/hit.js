var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HitSchema = new Schema({
    CourseId: {
        type: String,
        required: true,
    },
    Source: {
        type: String,
        required: true,
    },
    Target: {
        type: String,
        required: true,
    },
    Context: {
        type: Object,
        required: true,
    },
    Time: { type: Date, default: Date.now }
});

mongoose.model('hits', HitSchema);

var Hit = mongoose.model('hits');

var hit = function (req, res, next) {
    if (!req.body) {
        res.status(400).send('wrong params!');
    }
    else if (!(req.body.Source && req.body.Target && req.body.CourseId)) {
        res.status(400).send('wrong params!');
    } else {
        new Hit(req.body).save(function (err, ret) {
            if (!err) {
                res.status(200).send({ status: 'ok' });
            } else {
                res.status(400).send({ status: 'failed' });
            }
        });
    }
};

module.exports = hit;