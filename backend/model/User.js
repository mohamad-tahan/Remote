const mongoose = require('mongoose');

//users collection 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
    minLength:3
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
    unique: true,
    minLength:3
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
    minLength:3
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
    minLength:3
  },
  user_type:{
    type:Number,
    required: true,
  },
  profilePic:{
    type:String,
  },
  
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }],



});

module.exports = mongoose.model('User', userSchema);