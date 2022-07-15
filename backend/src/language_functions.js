const Language = require('../model/Language');


//Adding a new Language
async function addLanguage(body) {
    const {
      language_id,
      name,
      extension,
    } = body;
  
    const language = new Language({
      language_id,
        name,
        extension,
    });
  
    return await language.save();
  }

  module.exports = {
    addLanguage,
  }