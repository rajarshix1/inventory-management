const mongoose = require("mongoose")
const {Schema} = mongoose
require('../models/tenants.model');
require('../models/products.model');
require('../models/productVariants.model');
const salesOrderSchema = new Schema({
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    customerName:{
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
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
        type: String, //Confirmed
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('SalesOrder', salesOrderSchema);