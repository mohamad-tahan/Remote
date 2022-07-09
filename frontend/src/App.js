import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/pages/LoginPage/Login";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    
 
       <BrowserRouter>
     <Toaster position="top-center" reverseOrder={false}/>
     
       <div className="App" id = "app">
        <Routes>

        <Route path="/" element={<Login />}></Route>
       

        </Routes>

        </div>
      </BrowserRouter>
      
  );
}

export default App;
