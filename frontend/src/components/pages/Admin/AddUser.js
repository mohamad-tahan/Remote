import React, { useState } from "react";
import AdminNav from "./AdminNav";
import logo from "../../../pics/logo.png";
import toast from "react-hot-toast";
import "./Admin.css";

function AddUser() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateInputs() {
    if (!name || !username || !email || !password) {
      toast.error("All fields are required.");
      return;
    }
  }

  const addUser = async (e) => {
    e.preventDefault();
    validateInputs();
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
      }),
    });
    const response = await res.json();

    if (response.user) {
      toast.success(`User Added.`);
      setName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } else {
      toast.error("Error Adding User");
    }
  };

  return (
    <div>
      <AdminNav />

      <div className="addUser">
        <div className="top">
          <img src={logo} width="50px" height="50px" />
          <p className="add">Add a User</p>
        </div>
        <div className="userBox">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="btn">
            <button className="btn-add" onClick={addUser}>
              Add User
            </button>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
