import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"/>
        <Route path ="/signup"element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
