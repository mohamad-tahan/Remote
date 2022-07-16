import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Remote.css";
import { AiFillFileText } from "react-icons/ai";

const FilesDropdown = ({ onFileSelect, setIsSaving, isSaving }) => {
  const [files, setFiles] = useState([]);

  const user_id = localStorage.getItem("user_id");

  const getfiles = async () => {
    const res = await fetch(
      "http://127.0.0.1:3000/api/user/auth/getFilesbyUserId/?id=" + user_id
    );
    const data = await res.json();
    console.log(data);

    if (data) {
      setFiles(data);
      console.log(data);
    } else {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    if (isSaving) {
      getfiles();
      setIsSaving(false);
    }
  }, [isSaving]);

  useEffect(() => {
    getfiles();
  }, []);

  return (
    <>
      <select
        className="filesDropdown"
        onChange={(e) => onFileSelect(e.target.value)}
      >
        {files
          .map((i, index) => {
            return (
              <option key={i.id} value={JSON.stringify(i)}>
                {i.name}
              </option>
            );
          })
          .reverse()}
      </select>
    </>
  );
};

export default FilesDropdown;
