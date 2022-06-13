const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const CalendSchema = new Schema({
    data: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    type: {type: String, required: true},
});

module.exports = mongoose.model("calendar", CalendSchema);