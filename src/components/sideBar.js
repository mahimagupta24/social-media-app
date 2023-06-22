import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./components.css"

export default function SideBar() {
  const{logoutHandler}=useContext(AuthContext)
  return (
    <div className="side-bar-main">
        <div className="side-bar-content">
      <Link className="side-bar-link"to="/">
        <span className="icon"><i className="fa fa-home"></i></span>
        Home
      </Link>
      </div>
      <div className="side-bar-content">
      <Link className="side-bar-link"to="/explore"> <span  className="icon"><i className="fa fa-compass"></i></span>Explorer</Link>
      </div>
      <div className="side-bar-content">
      <Link className="side-bar-link"to="/bookmark"> <span  className="icon"><i className="fa fa-bookmark"></i></span>Bookmark</Link>
      </div>
     <button className="side-bar-content" onClick={logoutHandler}>Logout</button>
    </div>
  );
}
