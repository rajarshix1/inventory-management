const mongoose = require('mongoose');
const { Schema } = mongoose;
const tenantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model('Tenant', tenantSchema);