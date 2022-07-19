import "./App.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/pages/LoginPage/Login";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/pages/MainPage/Navbar";
import Home from "./components/pages/MainPage/Home.js";
import GenerateRoomId from "./components/pages/Room/GenerateRoomId";
import RemoteSocket from "./components/pages/Room/RemoteSocket";

function App() {
  return (
    
 
       <BrowserRouter>
     <Toaster position="top-center" reverseOrder={false}/>
     
       <div className="App" id = "app">
        <Routes>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/navbar" element={<Navbar />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/remote/:roomId" element={<RemoteSocket />}></Route>
        <Route path="/generateRoomId" element={<GenerateRoomId />}></Route>





        

        </Routes>

        </div>
      </BrowserRouter>
      
  );
}

export default App;
