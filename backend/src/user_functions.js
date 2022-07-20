const User = require('../model/User');
async function addUser(body, hashPassword) {
    const {
      name,
      username,
      email,
      user_type = 0,
      profilePic = "",
      
    } = body;
  
    const user = new User({
      name,
      username,
      email,
      password: hashPassword,
      user_type,
      profilePic,
      
    });
  
    return await user.save();
  }

  async function getUserByEmail(email) {
    return await User.findOne({email});
  }

  async function getUserById(id) {
    return await User.findById(id).populate("files");
  }

  async function getUsers() {
    return await User.find();
  }

  async function getById(id) {
    return await User.findById(id);
  }

  module.exports = {
    addUser,
    getUserByEmail,
    getUserById,
    getUsers,
    getById,
    
  }