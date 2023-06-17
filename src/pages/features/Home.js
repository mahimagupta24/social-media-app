import { useContext } from "react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { FeatureContext } from "../../contexts/FeatureContext";
import SideBar from "../../components/sideBar";
import Suggestions from "../../components/suggestions";
import { AuthContext } from "../../contexts/AuthContext";

export default function Home() {
  const { posts, setPosts, onUsernameClickHandler } =
    useContext(FeatureContext);
  // const [showlikedPost, setShowLikedPost] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  // const { getLikedPosts, getUnLikedPosts } = useContext(FeatureContext);

  // const handleLikePost = (postId) => {
  //   getLikedPosts(postId);
  // };

  // const handleUnlikePost = (postId) => {
  //   getUnLikedPosts(postId);
  //   setShowLikedPost(true);
  // };
  const handleSortedPost = () => {
    if (!sortOrder) {
      const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
      
    } else {
      setPosts([...posts]);   
    }
  };
  const loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
   console.log(loggedInUser)

  const homePost = posts.filter(post=>loggedInUser.following?.some(el=>el.username===post.username))
  console.log(homePost)
  return (
    <div>
      <SideBar/>
      <Suggestions/>
      <ul>
        <button onClick={handleSortedPost}>Latest Post</button>
      
              {/* <div>
                {showlikedPost && (
                  <span onClick={() => handleUnlikePost(_id)}>
                    <i className="fa fa-heart"></i>
                  </span>
                ) }
                {!showlikedPost&&
                  <span onClick={() => handleLikePost(_id)}>
                  
                    <i className="fa fa-heart"></i>
                  </span>
}
              </div> */}
        
      </ul>
    </div>
  );
}
