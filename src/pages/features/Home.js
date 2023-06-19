import { useContext } from "react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { FeatureContext } from "../../contexts/FeatureContext";
import SideBar from "../../components/sideBar";
import Suggestions from "../../components/suggestions";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

export default function Home() {
  const { posts, setPosts, onUsernameClickHandler } =
    useContext(FeatureContext);
  const { user,dispatch,state} = useContext(UserContext);
  console.log(user);
  const [sortOrder, setSortOrder] = useState(null);
  // const { getLikedPosts, getUnLikedPosts } = useContext(FeatureContext);

  // const handleLikePost = (postId) => {
  //   getLikedPosts(postId);
  // };

  // const handleUnlikePost = (postId) => {
  //   getUnLikedPosts(postId);
  //   setShowLikedPost(true);
  // };
  const socialUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(socialUser)

  const getUserPosts = async(username)=>{
    try{
      const response = await fetch(`/api/posts/user/${username}`,{
        method:"GET"
      })
      const data = await response.json()
      console.log("posts",data)
      dispatch({type:"GET_USER_POSTS",payload:data.posts})

    }
    catch(e){
      console.error(e)
    }
  }
  useEffect(()=>{
    getUserPosts()
  },[])

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
  
  const loggedInUserPosts = posts?.filter(post => post?.username === socialUser?.username);
console.log(loggedInUserPosts)

  const followingPosts = posts.filter((post) =>
    user?.following?.some((el) => el.username === post.username)
  );

  console.log(posts);
  console.log(followingPosts);
  return (
    <div>
      <SideBar />
      <Suggestions />
      <ul>
        <button onClick={handleSortedPost}>Latest Post</button>
       
        {loggedInUserPosts.map(post=><li>{post.content}</li>)}

        {followingPosts.map((followingPost) => (
          <li>{followingPost.content}</li>
        ))}
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
