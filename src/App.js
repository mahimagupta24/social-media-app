import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import SideBar from "./components/sideBar";
import Home from "./pages/features/Home";
import Bookmark from "./pages/features/Bookmark";
import LikedPost from "./pages/features/LikedPost";
import Explorer from "./pages/features/Explorer";

function App() {
  return (
    <div className="App">
      <SideBar/>
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path ="/signup"element={<Signup/>}/>
        <Route path ="/login"element={<Login/>}/>
        <Route path="/bookmark"element={<Bookmark/>}/>
        <Route path="/liked"element={<LikedPost/>}/>
        <Route path="/explore"element={<Explorer/>}/>
      </Routes>
    </div>
  );
}

export default App;
