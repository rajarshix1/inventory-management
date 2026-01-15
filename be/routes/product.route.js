const express = require('express');
const { createProduct, getProducts } = require('../controllers/product.controller');
const { auth, authorize } = require('../middleware/auth.middleware');
const productRoutes = express.Router();

productRoutes.post('/', auth, authorize('Owner', 'Manager'), createProduct);
productRoutes.get('/', auth, getProducts);

module.exports = productRoutes;