import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import SideBar from "./components/sideBar";
import Home from "./pages/features/Home";
import Bookmark from "./pages/features/Bookmark";
import Explorer from "./pages/features/Explorer";
import Profile from "./pages/Profile/Profile";
import Mockman from "mockman-js";
import Suggestions from "./components/suggestions";

function App() {
  return (
    <div className="App">
      {/* <SideBar/> */}
      {/* <Suggestions/> */}
      {/* <Profile/> */}
      {/* <Explorer/> */}
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path ="/signup"element={<Signup/>}/>
        <Route path ="/login"element={<Login/>}/>
        <Route path="/bookmark"element={<Bookmark/>}/>
        <Route path="/explore"element={<Explorer/>}/>
        <Route path ="/profile/:username"element={<Profile/>}/>
        <Route path ="/mockman"element={<Mockman/>}/>
      </Routes>
    </div>
  );
}

export default App;
