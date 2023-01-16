const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const ListsSchema = new Schema({
    project: {type: String, required: true},
    date: {type: String, required: true},
    teacher: {type: String, required: true},
    students: {type: Array, required: true},
    message: {type: String, required: false},
});

module.exports = mongoose.model("lists", ListsSchema);