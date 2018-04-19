const mongoose = require('mongoose');
const user = new mongoose.Schema({
    session_key : String,
    open_id : String,
    createMeeting : {
       type : Array,
       default : []
    },
    joinMeeting : {
       type : Array,
       default: [],
    },
    isOnline : Boolean
});
module.exports = user;

