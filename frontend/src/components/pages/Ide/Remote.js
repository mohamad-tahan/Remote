import Navbar from "../MainPage/Navbar";
import Sidebar from "./Sidebar";
import "./Remote.css";
import { VscRunAll } from "react-icons/vsc";
import { BsSaveFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../../../Spinner/Spinner";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { AiOutlineClear } from "react-icons/ai";
import LanguagesDropdown from "./LanguagesDropdown";

const Remote = () => {
  const [isLight, setIsLight] = useState(false);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  const [language, setLanguage] = useState({ id: 63, name: "javascript" , extension: "js"});//63 is id of javascript
  const [spin, setSpin] = useState(false);

  const handleRun = () => {
    setSpin(true);
    const data = new FormData();
    data.append("source_code", btoa(code)); //btoa encode the code wriiten by the user
    data.append("language_id", language.id);
    data.append("stdin", btoa(input)); //stdin is the standard input of the user
    axios({
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "c1619b850amshcd9170131f254aep18028fjsn380bac32c1bf",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: data,
    })
      .then(function (response) {
        console.log(response);
        const token = response.data.token;
        getResponse(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        if (status === 429) {
          console.log("Freemium ended: ", status);
        }

        console.log("Catch: ", error);
      });
  };
  const getResponse = async (token) => {
    const res = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "c1619b850amshcd9170131f254aep18028fjsn380bac32c1bf",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
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
        setTimeout(() => {
          getResponse(token);
        }, 2000);
        return;
      } else {
        console.log(response);
        setOutput(atob(response.data.stdout));
        setSpin(false);
        setInput(atob(response.data.stdin));
        console.log(atob(response.data.stdout)); //atob decodes the code that we got from the response and stdout is the standard output of the code
        return;
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };


  const changeTheme = (e) => {
    theme === "light" ? setTheme("vs-dark") : setTheme("light");
    toast.success("Theme Changed.", {
      style: {
        border: "1px solid #2e2d50",
        padding: "8px",
        color: "#2e2d50",
      },
      iconTheme: {
        primary: "#2e2d50",
        secondary: "#FFFAEE",
      },
    });
    setIsLight(!isLight);
    console.log(e);
  };
  const [theme, setTheme] = useState("vs-dark");

  //handleClear() clears code,input and output
  const handleClear = (e) => {
    // e.preventDefault();
    setCode("");
    setInput("");
    setOutput(null);
  };
  
  return (
    <div className="idePage">
      <Navbar />

      {spin && <Spinner />}
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
            <div
              className={`run ${isLight && " iconDark"}`}
              onClick={handleRun}
            >
              {" "}
              <VscRunAll />
            </div>
            <div className="clear" onClick={(e) => handleClear(e)}>
              <AiOutlineClear />
            </div>
            <LanguagesDropdown setLanguage={setLanguage} />
            <div />
          </div>

          <p className="fileName">filename</p>

          <Editor
            height="53vh"
            width="90vh"
            defaultLanguage={language.name}
            options={{ theme: theme, lineDecorationsWidth: 0 }}
            value={code}
            onChange={(e) => setCode(e)}
          />

          <div>
            <p className="inputCode">Input</p>

            <Editor
              height="20vh"
              options={{ lineDecorationsWidth: 0 }}
              onChange={(e) => setInput(e)}
              value={input}
            />
          </div>
        </div>

        <div>
          <p className="outputCode">Output</p>

          {
            <div>
              <div className="output">
                <Editor
                  height="76vh"
                  width="40vh"
                  options={{ lineNumbers: "off", lineDecorationsWidth: 0 }}
                  onChange={(e) => setOutput(e)}
                  value={output}
                />
              </div>

              {}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Remote;
