const mongoose = require('mongoose');
const { Schema } = mongoose;
require('../models/tenants.model');
require('../models/users.model');
const notificationSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tenantId: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
module.exports = mongoose.model('Notification', notificationSchema);