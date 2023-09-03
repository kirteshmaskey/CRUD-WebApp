require('dotenv').config();
require("./db/conn");

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./models/userSchema');
const cors = require("cors");
const router = require("./routes/routes");

const PORT = process.env.PORT || 8003;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT, ()=>{
    console.log(`Server Started at port ${PORT}`);
})