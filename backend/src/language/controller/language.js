const {addLanguage} = require("../../language_functions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

const Language = require("../../../model/Language")

const File = require("../../../model/File")

async function addLanguages(req, res) {
    try {
      const newLanguage = await addLanguage(req.body);
      console.log("newLanguage => ", newLanguage);
      const updateFile = await File.updateOne(
        {
          _id: newLanguage.file,
        },
        {
          $push: {
            languages: newLanguage._id,
          },
        }
      );

      console.log("updateFile =   ", updateFile)

      return res.status(200).send(newLanguage); // 200
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }


  module.exports ={
    addLanguages,
  }