import Navbar from "./Navbar";
import remoteLogo from "../../../pics/remoteLogo.png"
import "./Home.css"
import { TbBrandJavascript } from 'react-icons/tb';
import { FaPython } from 'react-icons/fa';
import { DiJavascript } from 'react-icons/di';
import { IoLogoJavascript } from 'react-icons/io';
import { FaReact } from 'react-icons/fa';
import { VscGithub } from 'react-icons/vsc';
import { TbBrandPhp } from 'react-icons/tb';
import idePic from "../../../pics/idePic.png"








const Home = () => {
    return (
        <div className="main">
    <Navbar/>
    
    <div className="logoPic">
    <img alt="" src={remoteLogo} />
    </div>

    <div className="description">
        <p className="title">What is Remote?</p>
        <p className="text">Remote is a simple yet powerful Live <br/>
         IDE, Editor, Compiler, Interpreter that<br/> runs and hosts in 10+ programming<br/> languages.
        </p><br/> <br/> 
        <button className='btn-createRemote btn-start'>Star Your Coding Journey</button>
        
     </div>
 
     <div className="description">
        <p className="title title2">Experience web <br/> development with Remote.</p>
        <p className="text text2">Create, share, and live code with others.</p>
        <br/>
        <br/>
        <div className="icons"> 
       <p><FaReact/></p> 
       <p> <TbBrandJavascript/></p> 
       <p><VscGithub/></p> 
       <p><FaPython/></p> 
       <p><DiJavascript/></p> 
       <p><TbBrandPhp/></p> 
       
        </div>
       
     </div>
     <div className="description">
        <img alt="" src={idePic}/>
     </div>


        </div>
    )
};

export default Home;

