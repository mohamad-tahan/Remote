const {
  addUser,
  getUserByEmail,
  getUserById,
  getUsers,
} = require("../../user_functions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

const User = require("../../../model/User");
const File = require("../../../model/File");
//registering user
async function register(req, res) {
  try {
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const addUserResult = await addUser(req.body, hashPassword);
    console.log("addUserResult =>", addUserResult);

    return res.send({ user: addUserResult._id });
  } catch (error) {
    console.log(error);
  }
}

//login for users
async function login(req, res) {
  try {
    const user = await getUserByEmail(req.body.email);
    if (!user) return res.status(400).send("Invalid credentials");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid credentials");

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      TOKEN_SECRET
    );

    return res.header("token", token).send({ token: `${token}` });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function getUser(req, res) {
  try {
    //get specific user by id
    if (req.query.id) {
      const id = req.query.id;
      const result = await getUserById(id);
      return res.status(200).send(result);
    }
    //get all users
    const result = await getUsers();
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.query.id },
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          profilePic: req.body.profilePic,
        },
      }
    );
    return res.send({message: "User Updated"});
  } catch (error) {
    console.log(error);
  }
}

async function removeUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.query.id });
    const deleteResult = await user.remove();

    await File.updateOne({ _id: user.files }, { $pull: { files: user._id } });

    return res.send({ message: "user Removed" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  removeUser,
};
