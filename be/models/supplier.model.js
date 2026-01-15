const mongoose = require('mongoose');
const { Schema } = mongoose;
const supplierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },

});
module.exports = mongoose.model('Supplier', supplierSchema);