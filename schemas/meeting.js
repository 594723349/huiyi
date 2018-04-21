const mongoose = require('mongoose');
const meeting = new mongoose.Schema({
    createUserId : String,
    title : String,
    startDate : String,
    endDate : String,
    address : String,
    introduction : String,
    limitNumber: Number,
    count : {
        allpyNum : Number,
        signInNum : Number
    },
    setting : {
        meetingUrl : String,
        invitation : String,
        meetingChange : String
    }
});
module.exports = meeting;