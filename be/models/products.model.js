const mongoose = require('mongoose');
const { Schema } = mongoose;
require('../models/tenants.model');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);