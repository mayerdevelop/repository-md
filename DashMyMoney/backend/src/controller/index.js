import { openDB } from "../configDB.js";

export async function createExpenses(){

    let query = ''

    query += ' CREATE TABLE IF NOT EXISTS Expenses ( '
    query += ' id INTEGER PRIMARY KEY, '
    query += ' description TEXT, '
    query += ' amount TEXT, '
    query += ' type TEXT, '
    query += ' frequency TEXT, '
    query += ' date TEXT '
    query += ' ) '

    openDB().then(db => { db.exec(query) });
};

export async function createGains(){

    let query = ''

    query += ' CREATE TABLE IF NOT EXISTS Gains ( '
    query += ' id INTEGER PRIMARY KEY, '
    query += ' description TEXT, '
    query += ' amount TEXT, '
    query += ' type TEXT, '
    query += ' frequency TEXT, '
    query += ' date TEXT '
    query += ' ) '

    openDB().then(db => { db.exec(query) });
};

export async function selectExpenses(id){
    return openDB().then(db => {
       return db.get('SELECT  * FROM Expenses WHERE id=?', [id]).then(res => res)
    });
};

export async function selectAllExpenses(){
    return openDB().then(db => {
       return db.all('SELECT  * FROM Expenses').then(res => res)
    });
};

export async function insertExpense(expense){

    let query = 'INSERT INTO Expenses(description, amount, type, frequency, date) VALUES (?,?,?,?,?)'

    openDB().then(db => {
       db.run(query, [expense.description, expense.amount, expense.type, expense.frequency, expense.date]);
    });
};

export async function updateExpense(expense){

    let query = 'UPDATE Expenses SET description=?, amount=?, type=?, frequency=?, date=? WHERE id=?'

    openDB().then(db => {
       db.run(query, [expense.description, expense.amount, expense.type, expense.frequency, expense.date, expense.id]);
    });
};

export async function deleteExpense(id){
    return openDB().then(db => {
       return db.get('DELETE FROM Expenses WHERE id=?', [id]).then(res => res)
    });
};


export async function selectGains(id){
    return openDB().then(db => {
       return db.get('SELECT * FROM Gains WHERE id=?', [id]).then(res => res)
    });
};

export async function selectAllGains(){
    return openDB().then(db => {
       return db.all('SELECT * FROM Gains').then(res => res)
    });
};

export async function insertGain(gain){

    let query = 'INSERT INTO Gains(description, amount, type, frequency, date) VALUES (?,?,?,?,?)'

    openDB().then(db => {
       db.run(query, [gain.description, gain.amount, gain.type, gain.frequency, gain.date]);
    });
};

export async function updateGain(gain){

    let query = 'UPDATE Gains SET description=?, amount=?, type=?, frequency=?, date=? WHERE id=?'

    openDB().then(db => {
       db.run(query, [gain.description, gain.amount, gain.type, gain.frequency, gain.date, gain.id]);
    });
};

export async function deleteGain(id){
    return openDB().then(db => {
       return db.get('DELETE FROM Gains WHERE id=?', [id]).then(res => res)
    });
};