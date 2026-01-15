const express = require('express');
const router = express.Router();
const userRoutes = require('./user.route');
const productRoutes = require('./product.route');
const tenantRoutes = require('./tenant.route');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/tenants', tenantRoutes);

module.exports = router;