import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/LoginPage/Login";
import { Toaster } from "react-hot-toast";
import Home from "./components/pages/MainPage/Home.js";
import GenerateRoomId from "./components/pages/Room/GenerateRoomId";
import RemoteSocket from "./components/pages/Room/RemoteSocket";
import Profile from "./components/pages/Profile/Profile";
import AddLanguage from "./components/pages/Admin/AddLanguage";
import AddUser from "./components/pages/Admin/AddUser";
import ViewUsers from "./components/pages/Admin/ViewUsers";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import ViewContacts from "./components/pages/Admin/ViewContacts";

function App() {
  return (
    
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="App" id="app">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/remote/:roomId" element={<RemoteSocket />}></Route>
          <Route path="/generateRoomId" element={<GenerateRoomId />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/contactUs" element={<ContactUs />}></Route>
          <Route path="/admin/addLanguage" element={<AddLanguage />}></Route>
          <Route path="/admin/addUser" element={<AddUser />}></Route>
          <Route path="/admin/viewUsers" element={<ViewUsers />}></Route>
          <Route path="/admin/viewContacts" element={<ViewContacts />}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
