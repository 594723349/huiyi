const mongoose = require('mongoose');
const Meeting = require('../schemas/meeting');
module.exports = mongoose.model('Meeting' , Meeting);