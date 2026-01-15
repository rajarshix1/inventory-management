const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, ///pre method
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
});

module.exports = mongoose.model('Product', productSchema);