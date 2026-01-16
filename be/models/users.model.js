const mongoose = require('mongoose');
const { Schema } = mongoose;
require('../models/tenants.model');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    userType: {
        type: String,
        enum: ['Owner', 'Manager', 'Staff'],
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);