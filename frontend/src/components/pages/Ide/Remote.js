import Navbar from "../MainPage/Navbar";
import Sidebar from "./Sidebar";
import "./Remote.css";
import { VscRunAll } from "react-icons/vsc";
import { BsSaveFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

const Remote = () => {
  const [isLight, setIsLight] = useState(false);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);

    console.log(output);
            
    const handleRun = () => {
      
      const data = new FormData(); 
      data.append("source_code", btoa(code)); //btoa encode the code wriiten by the user 
      data.append("language_id",71);
      data.append("stdin",btoa(input)) //stdin is the standard input of the user
     axios({
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        'X-RapidAPI-Key': 'c1619b850amshcd9170131f254aep18028fjsn380bac32c1bf',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: data,

     }).then(function (response) {
      console.log(response);
          const token = response.data.token;
          getResponse(token);
        })
        .catch((err) => {
          let error = err.response ? err.response.data : err;
          // get error status
          let status = err.response.status;
          // console.log("status", status);
          if (status === 429) {
            console.log("Freemium ended: ", status);
          }
          
          console.log("Catch: ", error);
        });
    
    }
    const getResponse = async (token) => {
      const res = {
        method: "GET",
        url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          'X-RapidAPI-Key': 'c1619b850amshcd9170131f254aep18028fjsn380bac32c1bf',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
      };
      try {
        let response = await axios.request(res);
        let statusDescription = response.data.status.description;
        let statusId = response.data.status.id;
        console.log(response.data.status);
         console.log(statusId);
         toast(statusDescription);
        
      //  statusId = 1 and statusId = 2 stand for in queue and processing so they need some time to get the response
        if (statusId === 1 || statusId === 2) {
          // getResponse(token)
          setTimeout(() => {getResponse(token);}, 2000);
          return;

        } else {  
          console.log(response)
          setOutput(response.data);
          console.log(atob(response.data.stdout)); //atob decodes the code that we got from the response and stdout is the standard output of the code
          return;
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    };







    
  








  const changeTheme = (e) => {
    toast.success('Theme Changed.', {
      style: {
        border: '1px solid #2e2d50',
        padding: '8px',
        color: '#2e2d50',
      },
      iconTheme: {
        primary: '#2e2d50',
        secondary: '#FFFAEE',
      },
    });
    setIsLight(!isLight);
    console.log(e);
  };


  return (
    <div className="idePage">
      <Navbar />
      
      <div className={`ide ${isLight && " lightTheme"}`}>
        <Sidebar />
          <div onClick={changeTheme} className={`sun ${isLight && "dark"}`}>
          <BsFillSunFill />
        </div>

        <div>
          <div className="ideIcons">
            <div className={`save ${isLight && " iconDark"}`}>
              {" "}
              <BsSaveFill />
            </div>
            <div className={`run ${isLight && " iconDark"}`} onClick={handleRun}>
              {" "}
              <VscRunAll />
            </div>
          
            <div />
          </div>

          <p className="fileName">filename</p>
          <textarea
            className={`codeText ${isLight && " theme"}`}
            spellCheck="true"
            onChange={(e)=>setCode(e.target.value)}
          />

          <div>
            <p className="inputCode">Input</p>
            <textarea className={`input ${isLight && " theme"}`} 
            onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

        <div>
      
          <p className="outputCode">Output</p>
          <textarea className={`output ${isLight && " theme"}`} />
        </div>
      </div>
    </div>
  );
};

export default Remote;
