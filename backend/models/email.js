const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const email = new Schema({
    subject:{
        type: String,
    },
    information: {
        type: String,
    },
    authorEmail: {
        type: String,
    },
    recipientEmail: {
        type: String,
    },
    sentTime:{
        type: Date,
    },
    senderType: {
        type: String,
    },
    sender: {
        type: Object,
    },
    fileCase: {
        type: Object,
    },
    fileCaseId: {
        type: String
    }
},{
    timestamps: true,
})

const Email = mongoose.model('Email', email);

module.exports = Email;