import Navbar from "./Navbar";
import remoteLogo from "../../../pics/remoteLogo.png"
import "./Home.css"
import { TbBrandJavascript } from 'react-icons/tb';


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
        <p className="text">Create, share, and live code with others.</p>
        <div className="icons"> <TbBrandJavascript/></div>
        
        
     </div>


        </div>
    )
};

export default Home;

