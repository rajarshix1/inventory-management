const express = require('express');
const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
    res.send('List of all users');
});

module.exports = userRoutes;