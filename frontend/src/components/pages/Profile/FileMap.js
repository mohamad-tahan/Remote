import React from "react";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { TbBrandJavascript, TbPlayerStop } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import { toast } from "react-hot-toast";

function FileMap({ i, deleteFile }) {
  const [pressed, setPressed] = useState(false);
  const [fileName, setFileName] = useState(i.name);
  const token = localStorage.getItem("token");

  const updateFileName = async (id) => {
    const res = await fetch(
      "http://127.0.0.1:3000/api/user/auth/updateFileName/?id=" + id,
      {
        method: "PUT",
        headers: { "content-type": "application/json", token: token },

        body: JSON.stringify({
          name: fileName,
        }),
      }
    );
    const response = await res.json();
    if (response) {
      setPressed(false);
      toast.success(`Remote Name Updated`);
    } else {
      toast.error("Error Updating Remote");
    }
  };

  return (
    <div>
      <div className="files" key={i._id} value={i._id}>
        {i.language === "js" ? (
          <TbBrandJavascript className="js" />
        ) : (
          <FaPython className="py" />
        )}{" "}
        {pressed ? (
          <input
            placeholder={i.name}
            key={i._id}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && updateFileName(i._id)}
          />
        ) : (
          <span>{fileName}</span>
        )}
        <div className="edit-delete">
          <MdModeEditOutline
            className="editIcon"
            onClick={(e) => {
              setPressed(!pressed);
            }}
          />{" "}
          <MdDeleteForever
            className="deleteIcon"
            onClick={(e) => deleteFile(i._id)}
          />
        </div>
      </div>
    </div>
  );
}

export default FileMap;
