import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Remote.css";

const LanguagesDropdown = ({ onOptionSelect }) => {
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



  return (
    <>
      <select className="langDropdown" onChange={(e)=> onOptionSelect(e.target.value) }>
        {languages.map((i, index) => {
          return (
            <option key={i.id} value={JSON.stringify(i)}>
              {i.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default LanguagesDropdown;
