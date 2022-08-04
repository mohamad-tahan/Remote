import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNav from "./AdminNav";
import SearchBar from "./SearchBar";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const getUsers = async () => {
    const res = await fetch("/auth/getUser", {
      headers: { "content-type": "application/json", token: token },
    });
    const data = await res.json();

    if (data) {
      setUsers(data);
    } else {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <AdminNav />
      <h1 className="viewUsers">View All Users</h1>
      <SearchBar users={users} setSearch={setSearch} />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Is Blocked</th>
          </tr>
        </thead>
        <tbody>
          {!search
            ? users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.user_type}</td>
                  {user.user_type === 2 ? (
                    <td style={{ color: "red" }}>Yes</td>
                  ) : (
                    <td>No</td>
                  )}
                </tr>
              ))
            : search.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.user_type}</td>
                  {user.user_type === 2 ? (
                    <td style={{ color: "red" }}>Yes</td>
                  ) : (
                    <td>No</td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUsers;
