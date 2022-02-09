const express = require('express');
const dbConnection = require('./config/db');
 // Third party logger 
 const morgan = require('morgan');
const dotenv = require('dotenv').config({path: './config/config.env'});

// Database Connection
dbConnection();

// Route Files
const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/users.routes');
const urlsRoutes = require('./src/routes/urls.routes');


// express app
const app = express();
const port = process.env.PORT || 3000;

// Public Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Load Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/urls', urlsRoutes);


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server is running on Port ${port}!`));