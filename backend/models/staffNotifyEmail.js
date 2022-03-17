const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffNotifyEmail = new Schema({
    notifyEmail:{
        type: Object,
    },
    staff: {
        type: Object,
    },
},{
    timestamps: true,
})

const StaffNotifyEmail = mongoose.model('StaffNotifyEmail', staffNotifyEmail);

module.exports = StaffNotifyEmail;