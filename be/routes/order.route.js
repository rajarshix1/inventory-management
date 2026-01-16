const express = require('express');
const router = express.Router();
const { createSalesOrder, createPurchaseOrder, updatePurchaseOrderStatus } = require('../controllers/order.controller');
const { auth } = require('../middleware/auth.middleware');

router.post('/sales', auth, createSalesOrder);
router.post('/purchase', auth, createPurchaseOrder);
router.put('/:id', auth, updatePurchaseOrderStatus); 

module.exports = router;
