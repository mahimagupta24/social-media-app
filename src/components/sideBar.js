import { Link } from "react-router-dom";

export default function SideBar() {
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
      <div>
      <Link to="/likedpost"> <span><i className="fa fa-heart"></i></span>Like</Link>
      </div>
    </div>
  );
}
