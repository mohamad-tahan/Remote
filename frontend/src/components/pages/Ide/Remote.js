import Navbar from "../MainPage/Navbar";
import Sidebar from "./Sidebar";
import "./Remote.css";
import { VscRunAll } from "react-icons/vsc";
import { BsSaveFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import { useState } from "react";

const Remote = () => {
  const [isLight, setIsLight] = useState(false);

  const changeTheme = (e) => {
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
            <div className={`run ${isLight && " iconDark"}`}>
              {" "}
              <VscRunAll />
            </div>
          
            <div />
          </div>

          <p className="fileName">filename</p>
          <textarea
            className={`codeText ${isLight && " theme"}`}
            spellCheck="true"
          />

          <div>
            <p className="inputCode">Input</p>
            <textarea className={`input ${isLight && " theme"}`} />
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
