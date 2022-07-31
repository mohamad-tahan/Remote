const ContactUs = require("../../../model/ContactUs");

async function addContact(body) {
    const {
      name,
      email,
      phone,
      message,
      
    } = body;
  
    const contact = new ContactUs({
      name,
      email,
      phone,
      message,
    });
  
    return await contact.save();
  }


  async function addContactUs(req, res) {
    try {
      const contact = await addContact(req.body);
      return res.send({ contact });
    } catch (error) {
      console.log(error);
    }
  }


    async function getContactUs(req, res) {
        try {
            const contact = await ContactUs.find();
            return res.send(contact);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteContactUs(req, res) {
        try {
            const contact = await ContactUs.findByIdAndDelete( req.query.id );
            return res.send({ message: "Message Removed" });

        } catch (error) {
            console.log(error);
        }
    }



    module.exports = {
        addContactUs,
        getContactUs,
        deleteContactUs
    }
