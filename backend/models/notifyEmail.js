const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notifyEmail = new Schema({
    subject:{
        type: String,
    },
    information: {
        type: String,
    },
    reportFile: {
        type: Object,
    },
},{
    timestamps: true,
})

const NotifyEmail = mongoose.model('NotifyEmail', notifyEmail);

module.exports = NotifyEmail;