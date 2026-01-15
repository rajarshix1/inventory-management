const express = require('express');
const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
    res.send('List of all users');
});

userRoutes.post('/', (req, res) => {
    res.send('Create a new user');
});

module.exports = userRoutes;