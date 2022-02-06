const express = require('express');
const dbConnection = require('./config/db');
 // Third party logger 
 const morgan = require('morgan');
const dotenv = require('dotenv').config({path: './config/config.env'});

// Database Connection
dbConnection();

// Route Files
const usersRoutes = require('./src/routes/users.routes');

// express app
const app = express();
const port = process.env.PORT || 3000;

// Public Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Load Routes
app.use('/api/v1/users', usersRoutes);


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server is running on Port ${port}!`));