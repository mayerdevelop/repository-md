const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const server = express();

server.use(express.json());
server.use(cors())

const Routes = require('./routes/Routes');

server.use('/menu', Routes);
server.use('/token', Routes);
server.use('/loginteste', Routes);

server.listen(3333, () =>{
    console.log('API ONLINE')


mongoose.connection.on("connected", ()=>{
    console.log("connected sucsess v120220826")
})

mongoose.connection.on("error", (err)=>{
    console.log("error",err)
})
});