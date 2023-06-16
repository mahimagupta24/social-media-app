import { useEffect, useState } from "react";
import SideBar from "../../components/sideBar";
import Suggestions from "../../components/suggestions";

export default function Home() {
  const [newPost, setNewPost] = useState("");
 
  return (
    <div>
      <SideBar/>
      <Suggestions/>
       <input value={newPost}onChange={(e) => setNewPost(e.target.value)}/>
      <button>Post</button> 
    </div>
  );
}
