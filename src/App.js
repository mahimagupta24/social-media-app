import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import SideBar from "./components/sideBar";

function App() {
  return (
    <div className="App">
      <SideBar/>
      <Routes>
        <Route path="/"/>
        <Route path ="/signup"element={<Signup/>}/>
        <Route path ="/login"element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
