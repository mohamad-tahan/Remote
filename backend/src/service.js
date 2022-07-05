const User = require('../model/User');
async function addUser(body, hashPassword) {
    const {
      name,
      username,
      email,
      
    } = body;
  
    const user = new User({
      name,
      username,
      email,
      password: hashPassword,
      
    });
  
    return await user.save();
  }

  module.exports = {
    addUser,
  }