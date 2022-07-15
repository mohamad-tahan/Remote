const mongoose = require('mongoose');

//languages collection 
const languageSchema = new mongoose.Schema({
  language_id:{
    type:Number
  },

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

});

module.exports = mongoose.model('Language', languageSchema);