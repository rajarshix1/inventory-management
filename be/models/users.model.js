const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
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
});
module.exports = mongoose.model('User', userSchema);