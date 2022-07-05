const { addUser, getUserByEmail } = require("../../service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

//registering user
async function register(req, res) {
  try {
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const addUserResult = await addUser(req.body, hashPassword);
    console.log("addUserResult =>", addUserResult);

    return res.send({ user: addUserResult._id });
  }
   catch (error) {
    console.log(error);
  }
}

//login for users
async function login(req, res) {
  try {
    const user = await getUserByEmail(req.body.email);
    if (!user)
     return res.status(400).send("Invalid credentials");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
     return res.status(400).send("Invalid credentials");

    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      TOKEN_SECRET
    );

    return res.header("token", token).send({ token: `${token}` });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = {
  register,
  login,
};
