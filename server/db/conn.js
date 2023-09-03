const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.set('strictQuery', false);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Connected to Database")).catch((error)=> console.log("Cannot connect to database" + error));