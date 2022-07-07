const User = require('../model/User');
const File = require('../model/File');


//Adding a new file
async function addFile(body) {
    const {
      name,
      code,
      language_id,
      user_id,
      date
     
    } = body;
  
    const file = new File({
      
        name,
        code,
        language_id,
        user_id,
        date,
     
    });
  
    return await file.save();
  }

  module.exports = {
    addFile,
  }