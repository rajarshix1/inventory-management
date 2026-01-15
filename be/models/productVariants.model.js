const mongoose = require('mongoose');
const { Schema } = mongoose;
require('../models/tenants.model');
require('../models/products.model');

const productVariantSchema = new Schema({
    sku: {
        type: String,
        required: true
    },
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});
productVariantSchema.index({ sku: 1, tenantId: 1 }, { unique: true });
productVariantSchema.index({ productId: 1, tenantId: 1 });

module.exports = mongoose.model('ProductVariant', productVariantSchema);