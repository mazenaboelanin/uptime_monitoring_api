const express = require('express');
const dbConnection = require('./config/db');
const dotenv = require('dotenv').config({path: './config/config.env'});
const app = express();
const port = process.env.PORT || 3000;

// Database Connection
dbConnection();

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server is running on Port ${port}!`));