import React, { useState } from "react";
import "./AddRemote.css";
import logo from "../../../pics/logoSpin.png";
import toast from "react-hot-toast";

function AddRemote({ setIsSaving, setFileName }) {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [isClosed, setIsClosed] = useState(false);

  const addRemote = async (e) => {
    if (name == "") {
      toast.error("Enter File Name");
      return;
    }
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const res = await fetch("/auth/addFiles", {
      method: "POST",
      headers: { "content-type": "application/json", token: token },
      body: JSON.stringify({
        name: name,
        code: " ",
        language: " ",
        owner_id: user_id,
      }),
    });
    setName("");
    const response = await res.json();
    if (response) {
      toast.success(`Remote Added`);
      setFileName(response.name);
      setIsSaving();
    } else {
      toast.error("Error Saving");
    }
  };

  const handleClose = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div className={`modal ${isClosed && "closeModal"}`}>
      <div className="showModal">
        <div className="addFile">
          <span onClick={handleClose} className="close">
            &times;
          </span>
          <div className="top">
            <img src={logo} width="50px" height="50px" />
            <p className="title">Create Remote</p>
          </div>
          <div className="inputBox">
            <input
              type="text"
              placeholder="Enter Remote Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />

            <button className="addRemote" onClick={addRemote}>
              Add Remote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRemote;
