const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    codigo:{type: String, required: true},
    title: {type: String, required: true},
    links: {type: Array, required: true},
});

module.exports = mongoose.model("menu", MenuSchema); 