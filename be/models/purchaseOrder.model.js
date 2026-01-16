const mongoose = require("mongoose")
const {Schema} = mongoose
require('../models/tenants.model');
require('../models/products.model');
require('../models/productVariants.model');
require('../models/supplier.model');
const purchaseOrderSchema = new Schema({
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    variantId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['Draft', 'Sent', 'Confirmed', 'Received'],
        default: 'Draft'
    }
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);