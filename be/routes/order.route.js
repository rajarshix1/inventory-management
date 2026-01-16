const express = require('express');
const router = express.Router();
const { createSalesOrder, createPurchaseOrder, updateOrderStatus } = require('../controllers/order.controller');
const { auth } = require('../middleware/auth.middleware');

router.post('/sales', auth, createSalesOrder);
router.post('/purchase', auth, createPurchaseOrder);
router.put('/:id/status', auth, updateOrderStatus);

module.exports = router;
