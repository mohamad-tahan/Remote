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

  
 
     


        </div>
    )
};

export default Home;

