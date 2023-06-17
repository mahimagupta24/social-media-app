import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function SideBar() {
  const{logoutHandler}=useContext(AuthContext)
  return (
    <div>
        <div>
      <Link to="/">
        <span><i className="fa fa-home"></i></span>
        Home
      </Link>
      </div>
      <div>
      <Link to="/explore"> <span><i className="fa fa-compass"></i></span>Explorer</Link>
      </div>
      <div>
      <Link to="/bookmark"> <span><i className="fa fa-bookmark"></i></span>Bookmark</Link>
      </div>
     <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}
