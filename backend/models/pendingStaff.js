const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pendingStaff = new Schema({
    email:{
        type: String,
    },
    password: {
        type: String,
    },
    encryptPassword: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    approveStaff: {
        type: Object,
    },
    approveTime:{
        type: Date,
    },
},{
    timestamps: true,
})

const PendingStaff = mongoose.model('PendingStaff', pendingStaff);

module.exports = PendingStaff;