var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WeeekSchema = new Schema({
    _id: {
        type: String
    },
    value: {
    }
});
mongoose.model('course_user_weeks', WeeekSchema);

var TotalSchema = new Schema({
    _id: {
        type: String
    },
    value: {
    }
});
mongoose.model('course_totals', TotalSchema);

var LearningUnitsSchema = new Schema({
    _id: {
        type: String
    },
    value: {
    }
});

mongoose.model('course_user_learning_units', LearningUnitsSchema);
