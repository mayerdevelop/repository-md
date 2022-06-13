const mongoose = require('mongoose')


const url =  'mongodb+srv://mayerdev:82514903fe@cluster0.chgpils.mongodb.net/?retryWrites=true&w=majority&ssl=true';
mongoose.connect(url, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});


module.exports = mongoose;