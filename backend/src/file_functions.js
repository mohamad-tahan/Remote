const User = require('../model/User');
const File = require('../model/File');


//Adding a new file
async function addFile(body) {
    const {
      name,
      code,
      language,
      owner_id,
      date
     
    } = body;
  
    const file = new File({
      
        name,
        code,
        language,
        owner_id,
        date,
     
    });
  
    return await file.save();
  }


//   async function getFileById(id) {
//     return await File.findById(id).populate("langauges");
//   }

  module.exports = {
    addFile,
  }