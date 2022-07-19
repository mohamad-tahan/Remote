const mongoose = require('mongoose');

//files collection 
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
  },
  owner_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  date:{ 
    type: Date, 
    default: Date.now
 },


});

module.exports = mongoose.model('File', fileSchema);