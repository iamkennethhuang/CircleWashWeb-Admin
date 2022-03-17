const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: false,
    },
    addresses: [{
        name: {type: String},
        street: {type: String},
        city: {type: String},
        zip:{type: String},
    }],
}, {
    timestamps: true,
});

const User = mongoose.model('User', user);

module.exports = User;