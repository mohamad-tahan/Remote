import React, { useState } from 'react'
import AdminNav from './AdminNav'
import logo from "../../../pics/logo.png"
import toast from 'react-hot-toast';
import "./AddLanguage.css"

function AddLanguage() {
  const[language_id, setLanguageId] = useState('');
        const[language_name, setLanguageName] = useState('');
        const[language_extension, setLanguageExtension] = useState('');

        function validateInputs() {
            if (!language_id || !language_name || !language_extension) {
              toast.error("All fields are required.");
              return;
            
            }
          }

    const addLanguage = async (e) => {
        e.preventDefault();
        validateInputs();
        const res = await fetch("/auth/addLanguages", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            language_id: language_id,
            name: language_name,
            extension: language_extension,
          }),
        });
        const response = await res.json();
        console.log("response", response);
    
        if (response.language_id) {
          toast.success(`Language Added.`);
          setLanguageId("");
            setLanguageName("");
            setLanguageExtension("");
        } else {
          toast.error("Error Adding Language");
        }
      };


  return (
    
    <div>
        
        <AdminNav/>
        
        <div className="addLanguage">
  
        <div className="top">
          <img src={logo} width="50px" height="50px" />
          <p className="add">Add a Language</p>
        </div>
        <div className="languageBox">
     
           <input
            type="text"
            placeholder="Language ID"
            value={language_id}
            onChange={(e) => setLanguageId(e.target.value)}
          />
           <input
            type="text"
            placeholder="Language Name"
            value={language_name}
            onChange={(e) => setLanguageName(e.target.value)}
          />
           <input
            type="text"
            placeholder="Language Extension"
            value={language_extension}
            onChange={(e) => setLanguageExtension(e.target.value)}
          />
          <br />
    <div className='btn'>
          <button className="btn-add" onClick={addLanguage}>
            Add Language
          </button>

          </div>
          <br />

         
          
        </div>
      </div>
    </div>
    
        
        
  )
}

export default AddLanguage