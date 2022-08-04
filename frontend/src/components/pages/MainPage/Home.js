import Navbar from "./Navbar";
import remoteLogo from "../../../pics/remoteLogo.png";
import "./Home.css";
import { TbBrandJavascript } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { DiJavascript } from "react-icons/di";
import { SiCss3 } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { TbBrandPhp } from "react-icons/tb";
import idePic from "../../../pics/idePic.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  let nav = useNavigate();
  const user_id = localStorage.getItem("user_id");

  function openIde() {
    if (user_id) {
      nav("/generateRoomId");
    } else {
      toast.error("You Are Not Registered.");

      nav("/login");
    }
  }
  return (
    <div className="main">
      <Navbar />

      <div className="logoPic">
        <img alt="" src={remoteLogo} />
      </div>

      <div className="description">
        <p className="titlee">What is Remote?</p>
        <p className="textt">
          Remote is a simple yet powerful Live <br />
          IDE, Editor, Compiler, Interpreter that
          <br /> runs and hosts in 10+ programming
          <br /> languages.
        </p>
        <br />

        <button className="btn-createRemote btn-start" onClick={openIde}>
          Start Your Coding Journey
        </button>
      </div>

      <div className="description">
        <p className="titlee title2">
          Experience web <br /> development with Remote.
        </p>
        <p className="textt text2">
          Programming made easier. <br /> Create, share, and live <br /> code
          with others.
        </p>

        <div className="icons">
          <p>
            <FaReact />
          </p>
          <p>
            {" "}
            <TbBrandJavascript />
          </p>
          <p>
            <SiCss3 />
          </p>
          <p>
            <FaPython />
          </p>
          <p>
            <DiJavascript />
          </p>
          <p>
            <TbBrandPhp />
          </p>
        </div>
      </div>

      <div className="description">
        <img alt="" src={idePic} />
      </div>

      <div className="description">
        <p className="titlee title2">Code from anywhere with Remote.</p>
        <p className="textt">
          Build projects and create static <br /> webistes with a community{" "}
          <br /> who’ve crafted 1000+ <br /> remotes.
        </p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
