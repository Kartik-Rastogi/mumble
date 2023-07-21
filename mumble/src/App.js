import Profile from "./components/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UpdateProfile from "./components/updateprofile/UpdateProfile";
import NoFileFound from "./components/NoFileFound";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
      <Route path='/update' element={<UpdateProfile/>}/>
      <Route path='/' element={user ? <Home/> : <Login/>} />
      <Route path='/login' element={user ? <Navigate to="/"/> :  <Login/>} />
      <Route path='/logout' element={<Login/>} />
      <Route path='/profile/:username' element={user ? <Profile/> : <Login/>}/>
      <Route path='*' element={<NoFileFound/>} />
      </Routes>

    </Router>
  );
}

export default App;
