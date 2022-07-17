import "./App.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/pages/LoginPage/Login";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/pages/MainPage/Navbar";
import Home from "./components/pages/MainPage/Home.js";
import Remote from "./components/pages/Ide/Remote";

function App() {
  return (
    
 
       <BrowserRouter>
     <Toaster position="top-center" reverseOrder={false}/>
     
       <div className="App" id = "app">
        <Routes>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/navbar" element={<Navbar />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/remote" element={<Remote />}></Route>
        

        </Routes>

        </div>
      </BrowserRouter>
      
  );
}

export default App;
