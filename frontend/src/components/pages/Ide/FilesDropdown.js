import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Remote.css";

const FilesDropdown = ({ onFileSelect, setIsSaving, isSaving }) => {
  const [files, setFiles] = useState([]);

  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const getfiles = async () => {
    const res = await fetch("/auth/getFilesbyUserId/?id=" + user_id, {
      headers: { "content-type": "application/json", token: token },
    });
    const data = await res.json();

    if (data) {
      setFiles(data);
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
        <option>My Remotes</option>
        {files
          .map((i, index) => {
            return (
              <option key={i.id} value={JSON.stringify(i)}>
                {i.name}
                {"."}
                {i.language}
              </option>
            );
          })
          .reverse()}
      </select>
    </>
  );
};

export default FilesDropdown;
