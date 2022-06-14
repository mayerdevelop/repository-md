const express = require('express');
const mongoose = require('mongoose')

const server = express();
server.use(express.json());

const CalendarRoutes = require('./routes/CalendarRoutes');
server.use('/calendar', CalendarRoutes);
server.use('/paramcalendar', CalendarRoutes);

server.listen(3000, () =>{
    console.log('API ONLINE')


mongoose.connection.on("connected", ()=>{
    console.log("connected sucsess v120220613")
})

mongoose.connection.on("error", (err)=>{
    console.log("error",err)
})
});