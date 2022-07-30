const mongoose = require('mongoose');

//contact us collection 
const contactSchema = new mongoose.Schema({
  name:{
    type:String,
  },

  email: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  
  phone: {
    type:String,
    required:true,
    min: 1,
    max: 255,
  },
  message: {
    type:String,
    required:true,
    min: 1,
    max: 255,
    },
    

});

module.exports = mongoose.model('ContactUs', contactSchema);