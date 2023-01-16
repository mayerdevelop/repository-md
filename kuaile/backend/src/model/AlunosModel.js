const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const AlunosSchema = new Schema({
    message: {type: String, required: false},
    name: {type: String, required: true},
    age: {type: String, required: true},
    core: {type: String, required: true},
    status: {type: String, required: true},
    birth: {type: String, required: true},
    rg: {type: String, required: false},
    cpf: {type: String, required: false},
    clothing: {type: Number, required: false},
    shoe: {type: Number, required: false},
    school: {type: String, required: false},
    schoolName: {type: String, required: false},
    guardian: {type: String, required: false},
    guardianCpf: {type: String, required: false},
    guardianCel: {type: String, required: false},
    guardianNis: {type: String, required: false},
    vaccineCard: {type: String, required: false},
    income: {type: Number, required: false}
});

module.exports = mongoose.model("alunos", AlunosSchema);