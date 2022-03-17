const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examine = new Schema({
    staff:{
        type: Object,
    },
    fileCase: {
        type: Object,
    },
    examineTime: {
        type: Date,
    },
    action: {
        type: String,
    },
},{
    timestamps: true,
})

const Examine = mongoose.model('Examine', examine);

module.exports = Examine;