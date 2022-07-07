const mongoose = require('mongoose');

//users collection 
const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  
  extension: {
    type:String,
    required:true,
  },
  files: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },

});

module.exports = mongoose.model('Language', languageSchema);