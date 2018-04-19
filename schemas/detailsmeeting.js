const mongoose = require('mongoose');
const meeting = new mongoose.Schema({
    createUserId : String,
    title : String,
    startDate : String,
    endDate : String,
    address : String,
    introduction : String,
    limitNumber: Number
});
module.exports = meeting;