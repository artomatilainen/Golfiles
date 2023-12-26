const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('../routes/user');
const authRoutes = require('../routes/authorization');

const app = express();

// Setting up server middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

// Test Route
app.get('/test', (req, res) => {
  res.send('Hello world!');
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
