const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    username: {type: String, required: true},
    tokenvalid: {type: String, required: true},
    type: {type: Number, required: true},
});

module.exports = mongoose.model("login", LoginSchema);