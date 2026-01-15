const express = require('express');
const { createUser, login } = require('../controllers/user.controller');
const { auth, authorize } = require('../middleware/auth.middleware');
const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
    res.send('List of all users');
});
userRoutes.post('/', auth, authorize('Owner', 'Manager'), createUser);
userRoutes.post('/login', login);


module.exports = userRoutes;