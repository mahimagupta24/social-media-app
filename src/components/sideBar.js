import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./components.css"

export default function SideBar() {
  const{logoutHandler}=useContext(AuthContext)
  const navigate= useNavigate()
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
      <div className="side-bar-content">
     <button className="logout-btn" onClick={logoutHandler}> <span className="sign-out-icon"><i class="fa fa-sign-out"></i></span>Logout</button>
    </div>
    </div>

  );
}
