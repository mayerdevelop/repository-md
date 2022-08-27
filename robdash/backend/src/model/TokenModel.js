const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    company: {type: String, required: true},
    token: {type: String, required: true},
    menu: {type: String, required: true},
});

module.exports = mongoose.model("token", TokenSchema);