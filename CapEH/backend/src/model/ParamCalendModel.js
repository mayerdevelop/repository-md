const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const ParamCalendSchema = new Schema({
    minDate: {type: String, required: true},
    maxDate: {type: String, required: true},
});

module.exports = mongoose.model("paramcalendar", ParamCalendSchema);