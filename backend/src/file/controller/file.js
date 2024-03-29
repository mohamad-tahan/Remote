const { addFile } = require("../../file_functions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

const User = require("../../../model/User");
const File = require("../../../model/File");

const { getFilesByOwnerId } = require("../../file_functions");

async function addFiles(req, res) {
  try {
    const newFile = await addFile(req.body);
    console.log("newFile=> ", newFile);
    const updateUser = await User.updateOne(
      {
        _id: newFile.owner_id,
      },
      {
        $push: {
          files: newFile._id,
        },
      }
    );
    // console.log("updateUser =>", updateUser);
    return res.status(200).send(newFile); // 200
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function getFilesbyId(req, res) {
  try {
    if (req.query.id) {
      const result = await File.findOne({ _id: req.query.id });
      // console.log("result of specific file of user =>", result);
      return res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateFile(req, res) {
  try {
    const file = await File.findByIdAndUpdate(
      { _id: req.query.id },
      {
        $set: {
          name: req.body.name,
          code: req.body.code,
          language: req.body.language,
        },
        $addToSet: {
          owner_id: req.body.owner_id,
        },
      }
    );
    return res.send({ message: "File Updated" });
  } catch (error) {
    console.log(error);
  }
}

async function removeFile(req, res) {
  try {
    const file = await File.findOne({ _id: req.query.id });

    const deleteResult = await file.remove();

    await User.updateOne({ _id: file.user }, { $pull: { files: file._id } });

    return res.send({ message: "File Removed" });
  } catch (error) {
    console.log(error);
  }
}

async function getFilesbyUserId(req, res) {
  try {
    if (req.query.id) {
      const id = req.query.id;
      const result = await getFilesByOwnerId(id);
      // console.log("Files of owner =>", result);
      return res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateFileName(req, res) {
  try {
    const file = await File.findByIdAndUpdate(
      { _id: req.query.id },
      {
        $set: {
          name: req.body.name,
        },
      }
    );
    return res.send({ message: "File Name Updated" });
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  addFiles,
  getFilesbyId,
  updateFile,
  removeFile,
  getFilesbyUserId,
  updateFileName,
};
