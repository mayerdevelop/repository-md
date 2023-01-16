const express = require('express');
const mongoose = require('mongoose')

const server = express();
server.use(express.json());

const ListRoutes = require('./routes/ListRoutes');
server.use('/alunos', ListRoutes);
server.use('/lists', ListRoutes);
server.use('/login', ListRoutes);

server.listen(3000, () =>{
    console.log('API ONLINE')


mongoose.connection.on("connected", ()=>{
    console.log("connected sucsess v120221222")
})

mongoose.connection.on("error", (err)=>{
    console.log("error",err)
})
});