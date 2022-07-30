import React, { useState } from "react";
import Navbar from "../MainPage/Navbar";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

import "./ContactUs.css";
import toast from "react-hot-toast";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function validateInputs() {
    if (!name || !email || !phone || !message) {
      toast.error("All fields are required.");
      return;
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    validateInputs();
    const res = await fetch("/auth/addContactUs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        message: message,
      }),
    });

    const response = await res.json();
    if (response.contact) {
      toast.success("Message Sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } else {
      toast.error("Error Sending Message");
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="contactContainer">
        <div className="remoteInfo">
          <p>
            Remote strives to provide the best service possible with every
            contact. We have served the needs of many people and we are always
            looking to improve our service.
          </p>
          <div className="contactIcons">
            <div>
              <span className="contactIcon">
                <MdLocationOn className="contactIcon" />
              </span>
              <span>Lebanon</span>
            </div>
            <br />
            <div>
              <span>
                <FaPhoneAlt className="contactIcon" />
              </span>
              <span>+961-71529634</span>
            </div>
            <br />
            <div>
              <span>
                <HiOutlineMail className="contactIcon" />
              </span>
              <span>remote@remote.com</span>
            </div>
            <br />
            <div>
              <span>
                <BiWorld className="contactIcon" />
              </span>
              <span>www.remote.com</span>
            </div>
            <br />
          </div>
        </div>
        <div className="contactUs">
          <h1>Pitch Us</h1>
          <div>
            <label>Name</label>

            <br />

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label>Email</label>
            <br />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label>Phone</label>
            <br />

            <input
              type="text"
              placeholder="Enter your email"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <br />
          <div>
            <label>Message</label>
            <br />

            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <br />

          <button className="btn-sendContact" onClick={handleClick}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
