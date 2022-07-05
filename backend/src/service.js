const User = require('../model/User');
async function addUser(body, hashPassword) {
    const {
      name,
      username,
      email,
      user_type = 0,
      
    } = body;
  
    const user = new User({
      name,
      username,
      email,
      password: hashPassword,
      user_type,
      
    });
  
    return await user.save();
  }

  async function getUserByEmail(email) {
    return await User.findOne({email});
  }

  async function getUserById(id) {
    return await User.findById(id);
  }

  async function getUsers() {
    return await User.find();
  }

  module.exports = {
    addUser,
    getUserByEmail,
    getUserById,
    getUsers,
    
  }