const {addFile} = require("../../file_functions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

const User = require("../../../model/User")

async function addFiles(req, res) {
    try {
      const newFile = await addFile(req.body);
      console.log("newFile=> ", newFile);
      const updateUser = await User.updateOne(
       
        {
          _id: newFile.user_id,
        },
        {
          $push: {
            files: newFile._id,
          },
        }
      );
      console.log("updateUser =>", updateUser);
      return res.status(200).send(newFile); // 200
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }


  module.exports = {
    addFiles,
  }