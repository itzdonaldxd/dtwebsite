const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var showSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    year: {
        type: Number,
        required: 'year is required'
    },
    semester: {
        type: String,
        required: 'semester (fall/spring) is required'
    },
    prefsOpen: {
        type: Boolean
    },
    prodConflictsOpen: {
        type: Boolean
    },
    date: {
        type: Date,
        required: 'date required to sort shows by time'
    },
    isActive: {
        type: Boolean
    },
});

var Show = mongoose.model('Show', showSchema)
module.exports = Show;