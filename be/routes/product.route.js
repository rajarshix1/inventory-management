const express = require('express');
const productRoutes = express.Router();
productRoutes.get('/', (req, res) => {
    res.send('List of all products');
});

module.exports = productRoutes;