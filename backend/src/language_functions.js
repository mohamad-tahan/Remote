const Language = require('../model/Language');


//Adding a new Language
async function addLanguage(body) {
    const {
      name,
      extension,
    } = body;
  
    const language = new Language({
        name,
        extension,
    });
  
    return await language.save();
  }

  module.exports = {
    addLanguage,
  }