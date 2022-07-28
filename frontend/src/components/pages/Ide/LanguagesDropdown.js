import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Remote.css";

const LanguagesDropdown = ({ onOptionSelect }) => {
  const [languages, setLanguages] = useState([]);
  const token = localStorage.getItem("token");

  const getLanguages = async () => {
    const res = await fetch("/auth/getLanguages", {
      headers: { "content-type": "application/json", token: token },
    });
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
      <select
        className="langDropdown"
        onChange={(e) => onOptionSelect(e.target.value)}
      >
        <option>Language</option>
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
