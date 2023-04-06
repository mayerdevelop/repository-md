import {
    createExpenses,
    createGains,
    insertExpense,
    selectExpenses,
    selectAllExpenses,
    updateExpense,
    deleteExpense,
    insertGain,
    selectGains,
    selectAllGains,
    updateGain,
    deleteGain
} from './controller/index.js';

import express from 'express';
const app = express();

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

createExpenses()
createGains()

app.get('/expenses', async function(req, res){
    let expense = await selectAllExpenses();
    res.json(expense)
});

app.get('/filterexpenses', async function(req, res){
    let expense = await selectExpenses(req.body.id);
    res.json(expense)
});

app.post('/expenses', function(req, res){
    insertExpense(req.body)
    res.json({
        "statusCode": 200,
        "message": "criado com sucesso"
    })
});

app.put('/expenses', function(req, res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode": 400,
            "message": "necessario informar id para atualizar"
        })
    }else{
        res.json({
            "statusCode": 200,
            "message": "atualizado com sucesso"
        })
    }

    updateExpense(req.body)
    res.json({"statusCode": 200})
});

app.delete('/expenses', async function(req, res){
    let expense = await deleteExpense(req.body.id);
    res.json(expense)
});


/**********/

app.get('/gains', async function(req, res){
    let gain = await selectAllGains();
    res.json(gain)
});

app.get('/filtergains', async function(req, res){
    let gain = await selectGains(req.body.id);
    res.json(gain)
});

app.post('/gains', function(req, res){
    insertGain(req.body)
    res.json({
        "statusCode": 200,
        "message": "criado com sucesso"
    })
});

app.put('/gains', function(req, res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode": 400,
            "message": "necessario informar id para atualizar"
        })
    }else{
        res.json({
            "statusCode": 200,
            "message": "atualizado com sucesso"
        })
    }

    updateGain(req.body)
    res.json({"statusCode": 200})
});

app.delete('/gains', async function(req, res){
    let gain = await deleteGain(req.body.id);
    res.json(gain)
});

app.listen(3333, ()=> console.log('API Online '))