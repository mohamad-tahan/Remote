const mongoose = require('mongoose');

//users collection 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },

  
});

module.exports = mongoose.model('User', userSchema);