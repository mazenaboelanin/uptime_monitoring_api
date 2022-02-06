const express = require('express');
const dotenv = require('dotenv').config({path: './config/config.env'});
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server is running on Port ${port}!`));