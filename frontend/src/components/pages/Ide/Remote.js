import Navbar from "../MainPage/Navbar";
import Sidebar from "./Sidebar";
import "./Remote.css"
import { VscRunAll } from 'react-icons/vsc';
import { BsSaveFill } from 'react-icons/bs';

const Remote = () =>{

    return(
    <div className="idePage">
       <Navbar/>
    <div className="ide">
       <Sidebar/>

       <div>

        <div className="ideIcons">
        <div className="save"> <BsSaveFill/></div>
       <div className="run"> <VscRunAll/></div>
       <div/>
       </div>
       
       <p className="fileName">filename</p>
        <textarea className="codeText" spellCheck="true"/>

        <div>
        <p className="inputCode">Input</p>
        <textarea className="input"/>
        </div>

        </div>

       <div>
       <p className="outputCode">Output</p>
        <textarea className="output"/>
        </div>

       </div>

      </div>   
    )
    }

export default Remote;