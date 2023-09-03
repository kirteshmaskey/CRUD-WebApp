const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    middleName:{
        type: String,
    },
    lastName:{
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    collegeId:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
})

const users = new mongoose.model("users", userSchema);

module.exports = users; 