const express = require('express');
const { createProduct, getProducts, getDashboard } = require('../controllers/product.controller');
const { auth, authorize } = require('../middleware/auth.middleware');
const productRoutes = express.Router();

productRoutes.post('/', auth, authorize('Owner', 'Manager'), createProduct);
productRoutes.get('/', auth, getProducts);
productRoutes.get('/dashboard', auth, getDashboard);

module.exports = productRoutes;