import { useEffect, useState } from "react";
import SideBar from "../../components/sideBar";
import Suggestions from "../../components/suggestions";
import { useContext } from "react";
import { FeatureContext } from "../../contexts/FeatureContext";


export default function Home() {
//   const{allposts} = useContext(FeatureContext)
//   const[sortOrder,setSortOrder]=useState(null)
//   const [newPost, setNewPost] = useState("");
//   const handleSortedPost =()=>{
// if(sortOrder==="asc"){
//   [...allposts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//   setSortOrder("desc")
// }else{
//   [...allposts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   setSortOrder("asc")
// }
//   } 
 
  return (
    <div>
      <SideBar/>
      <Suggestions/>
      {/* <button onClick={handleSortedPost}>Latest Post</button> */}
       {/* <input value={newPost}onChange={(e) => setNewPost(e.target.value)}/> */}
      <button>Post</button> 
    </div>
  );
}
