import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Remote.css";
import { VscRunAll } from "react-icons/vsc";
import { BsSaveFill, BsFillSunFill } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../../../Spinner/Spinner";
import Editor from "@monaco-editor/react";
import { AiOutlineClear } from "react-icons/ai";
import LanguagesDropdown from "./LanguagesDropdown";
import DownloadLink from "react-download-link";
import { HiDocumentDownload } from "react-icons/hi";
import FilesDropdown from "./FilesDropdown";
import AddRemote from "./AddRemote";
import MyChatbot from "../Chatbot/MyChatbot";
import Voice from "../Videosdk/Voice";
import TimeComplexity from "../../TimeComplexity/TimeComplexity";

const Remote = ({ socketRef, roomId }) => {
  const [isLight, setIsLight] = useState(false);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState({
    language_id: 63,
    name: "javascript",
    extension: "js",
  }); //63 is id of javascript
  const [spin, setSpin] = useState(false);
  const [fileName, setFileName] = useState("Create Remote");
  const owner_id = localStorage.getItem("user_id");
  const [fileId, setFileId] = useState();
  const [showModel, setShowModel] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const token = localStorage.getItem("token");
  const [user_id, setUserId] = useState(owner_id);

  const handleRun = () => {
    if (fileName == "Create Remote" || fileName == null) {
      toast.error("Create a Remote First");
      return;
    } else if (code == "") {
      toast.error("Code is Empty.");
      return;
    }
    setSpin(true);
    const data = new FormData();
    data.append("source_code", btoa(code)); //btoa encode the code wriiten by the user
    data.append("language_id", language.language_id);
    data.append("stdin", btoa(input)); //stdin is the standard input of the user
    axios({
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      },
      data: data,
    })
      .then(function (response) {
        const token = response.data.token;
        getResponse(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
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
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      },
    };
    try {
      let response = await axios.request(res);
      let statusDescription = response.data.status.description;
      let statusId = response.data.status.id;
      toast(statusDescription);
      //  statusId = 1 and statusId = 2 stand for in queue and processing so they need some time to get the response
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          getResponse(token);
        }, 2000);
        return;
      } else {
        setOutput(atob(response.data.stdout));
        setSpin(false);
        setInput(atob(response.data.stdin)); //atob decodes the code that we got from the response and stdout is the standard output of the code
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
  };

  //handleClear() clears code,input and output
  const handleClear = (e) => {
    setCode("");
    setInput("");
    setOutput("");
  };

  //handleSave() saves the code in the database
  const handleSave = async (e) => {
    e.preventDefault();
    if (fileName == "Create Remote" || fileName === null) {
      toast.error("Create a Remote First");
      return;
    }
    const res = await fetch("/auth/updateFile/?id=" + fileId, {
      method: "PUT",
      headers: { "content-type": "application/json", token: token },

      body: JSON.stringify({
        name: fileName,
        code: code,
        language: language.extension,
        owner_id: user_id,
      }),
    });
    const response = await res.json();
    if (response) {
      toast.success(`Remote Saved`);
      setIsSaving(true);
    } else {
      toast.error("Error Saving Remote");
    }
  };

  const handleFileChange = (e) => {
    e = JSON.parse(e);
    setCode(e.code);
    setFileName(e.name);
    setFileId(e._id);
  };

  const handleCodeChange = (e) => {
    setCode(e);
    socketRef.current?.emit("codeChange", {
      roomId,
      code: e,
      fileId: fileId,
      user_id: user_id,
    });
  };

  //handling code / userId / fileid / fileName in socket room
  useEffect(() => {
    socketRef.current?.emit("userIdChange", {
      roomId,
      user_id,
    });
  }, [user_id]);

  useEffect(() => {
    socketRef.current?.emit("fileChange", {
      roomId,
      fileName,
    });
  }, [fileName]);

  useEffect(() => {
    socketRef.current?.emit("fileIdChange", {
      roomId,
      fileId,
    });
  }, [fileId]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("fileIdChange", ({ fileId }) => {
        setFileId(fileId);
      });
      socketRef.current.on("userIdChange", ({ user_id }) => {
        setFileId(user_id);
      });
      socketRef.current.on("fileChange", ({ fileName }) => {
        setFileName(fileName);
      });
      socketRef.current.on("codeChange", ({ code }) => {
        setCode(code);
      });
    }
    return () => {
      socketRef.current.off("userIdChange");
      socketRef.current.off("fileIdChange");
      socketRef.current.off("codeChange");
      socketRef.current.off("codeChange");
    };
  }, [socketRef.current]);

  useEffect(() => {
    setTheme("vs-dark");
  }, []);

  return (
    <div className="idePage">

      {showModel && (
        <AddRemote
          setIsSaving={() => setIsSaving(true)}
          setFileName={setFileName}
        />
      )}

      {spin && <Spinner />}

      <div className={`ideContainer ${isLight && " lightTheme"}`}>
        <div className={`ide ${isLight && " lightTheme"}`}>
          <Sidebar
            setShowModel={() => {
              setShowModel(!showModel);
            }}
          />

          <MyChatbot />

          <div onClick={changeTheme} className={`sun ${isLight && "dark"}`}>
            <BsFillSunFill />
          </div>
        </div>
        <div>
          <div className="ideIcons">

            <div className="save" onClick={handleSave}>
              <BsSaveFill />
            </div>
            <div className="run" onClick={handleRun}>
              <VscRunAll />
            </div>
            

            <div className="clear" onClick={(e) => handleClear(e)}>
              <AiOutlineClear />
            </div>

            <LanguagesDropdown
              onOptionSelect={(e) => setLanguage(JSON.parse(e))}
            />
          <TimeComplexity code={code}/>

            <div className="download">
              
              <DownloadLink
                label={<HiDocumentDownload className="download" />}
                filename={fileName + "." + language.extension}
                exportFile={() => code}
              />

            </div>
           
          </div>
          
          <p className="fileName">{fileName}</p>
          <Editor
            height="53vh"
            width="90vh"
            defaultLanguage={language.name}
            options={{ theme: theme, lineDecorationsWidth: 0 }}
            value={code}
            onChange={(e) => handleCodeChange(e)}
            language={language.name}
            className="editor"
          />
          <div>
            <p className="inputCode">Input</p>
            <textarea
              className={`input ${isLight && " theme"}`}
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </div>
        </div>
        <div>
          <div className="drop">
            <FilesDropdown
              setIsSaving={setIsSaving}
              isSaving={isSaving}
              onFileSelect={(e) => handleFileChange(e)}
            />
            <Voice roomId={roomId} />
          </div>
          <p className="outputCode">Output</p>
          <textarea
            className={`output ${isLight && " theme"}`}
            onChange={(e) => setOutput(e)}
            value={output}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Remote;
