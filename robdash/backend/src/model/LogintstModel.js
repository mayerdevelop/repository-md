const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const LogintesteSchema = new Schema({
    user: {type: String, required: true},
    pass: {type: String, required: true},
    name: {type: String, required: true},
    token: {type: String, required: true},
});

module.exports = mongoose.model("loginteste", LogintesteSchema);