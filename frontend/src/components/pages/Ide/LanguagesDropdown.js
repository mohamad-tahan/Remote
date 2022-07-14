import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Remote.css";

const LanguagesDropdown = ({ setLanguage }) => {
  const [languages, setLanguages] = useState([]);
  
  const getLanguages = async () => {
    const res = await fetch("http://127.0.0.1:3000/api/user/auth/getLanguages");
    const data = await res.json();

    if (data) {
      setLanguages(data);
    } else {
      toast.error("Something went wrong.");
    }

  };

  useEffect(() => {
    getLanguages();
  }, []);

  const handleSelect = (e) => {
    e = e.target.value;
    let name = e.split(" ")[0];
    let id = e.split(" ")[1];
    let extension = e.split(" ")[2];

    setLanguage({id: id, name:name, extension:extension});
  };


  return (
    <>
      <select className="langDropdown" onChange={handleSelect}>
        {languages.map((i, index) => {
          return (
            <option key={i.id} value={i.name + " " + i.id + " " + i.extension}>
              {i.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default LanguagesDropdown;
