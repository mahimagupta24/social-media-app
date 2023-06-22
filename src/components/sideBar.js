import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./components.css"

export default function SideBar() {
  const{logoutHandler}=useContext(AuthContext)
  return (
    <div className="side-bar-main">
        <div>
      <Link to="/">
        <span className="icon"><i className="fa fa-home"></i></span>
        Home
      </Link>
      </div>
      <div>
      <Link to="/explore"> <span  className="icon"><i className="fa fa-compass"></i></span>Explorer</Link>
      </div>
      <div>
      <Link to="/bookmark"> <span  className="icon"><i className="fa fa-bookmark"></i></span>Bookmark</Link>
      </div>
     <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}
