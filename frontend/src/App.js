import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
  
       <BrowserRouter>
       <div className="App" id = "app">
        <Routes>

        <Route path="/" element={<Login />}></Route>
       

        </Routes>

        </div>
      </BrowserRouter>

  );
}

export default App;
