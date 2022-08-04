import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNav from "./AdminNav";
import { MdDeleteForever } from "react-icons/md";

function ViewContacts() {
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem("token");

  const getContacts = async () => {
    const res = await fetch("/auth/getContactUs", {
      headers: { "content-type": "application/json", token: token },
    });
    const data = await res.json();

    if (data) {
      setContacts(data);
    } else {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleDelete = async (contactId) => {
    const res = await fetch("/auth/deleteContactUs/?id=" + contactId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res) {
          toast.success("Message Removed");
          getContacts();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <AdminNav />
      <h1 className="viewUsers">Messages</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.message}</td>
              <td onClick={(e) => handleDelete(contact._id)}>
                <MdDeleteForever style={{ color: "red", cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewContacts;
