const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileCase = new Schema({
    open:{
        type: Boolean,
    },
    user: {
        type: Object,
    },
    reportFile: {
        type: Object,
    },
    solution: {
        type: Object,
    },
    reportFileId: {
        type: String,
    },
    status: {
        type: String,
    }
},{
    timestamps: true,
})

const FileCase = mongoose.model('FileCase', fileCase);

module.exports = FileCase;