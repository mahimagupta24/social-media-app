import { useContext } from "react";
import { useEffect, useState } from "react";
import { FeatureContext } from "../../contexts/FeatureContext";
import SideBar from "../../components/sideBar";
import Suggestions from "../../components/suggestions";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import "./features.css";

export default function Home() {
  const {
    posts,
    setPosts,
    getUserPosts,
    setNewPost,
    addNewPost,
    getLikedPosts,
    getUnLikedPosts,
    newPost,
    deletePosts,
  } = useContext(FeatureContext);

  const { addBookmarkPosts, removeBookmarkPosts, state } =
    useContext(UserContext);

  const { user } = useContext(AuthContext);
  const[sortOrder,setSortOrder]=useState(null)
  // const handleLikePost = (postId) => {
  //   getLikedPosts(postId);
  // };

  // const handleUnlikePost = (postId) => {
  //   getUnLikedPosts(postId);
  //   setShowLikedPost(true);
  // };

  const socialUser = JSON.parse(localStorage.getItem("loggedInUser"));

  console.log(posts);
  console.log(user)

  useEffect(() => {
    getUserPosts(socialUser.username);
  }, [socialUser.username]);

  

  const loggedInUserPosts = posts?.filter(
    (post) => post?.username === socialUser?.username
  );

  const followingPosts = posts?.filter((post) =>
    user?.following?.some((el) => el.username === post.username)
  );

  

  const allPosts = [ ...followingPosts,...loggedInUserPosts];
  console.log(allPosts);

  const sortLikedPosts =()=>{
    const sortedPosts =
   [...posts].sort(
      (a, b) => b.likes.likeCount - a.likes.likeCount)
      setPosts(sortedPosts)
   }

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

  const handlePostSubmit = () => {
    addNewPost(newPost);
    setNewPost("");
  };

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const isBookmarked = (postId) =>
    user?.bookmarks?.find((bookmark) => bookmark._id === postId);

  return (
    <div className="post-container">
      <div>
        <SideBar />
      </div>

     
      <ul className="post-card">
        <div className="add-post-container">
          <input className="added-post-card" placeholder="What is happening"onChange={handlePostChange} value={newPost} />
          </div>
          <div>
          <button id="post-btn"onClick={handlePostSubmit}>Post</button>
          </div>
          
      
          <div className="sort-btns">
          <button id="sort-btn"onClick={handleSortedPost}>Latest Post</button>
          <button id="trending-btn"onClick={sortLikedPosts}>Trending</button>
          </div>
        {allPosts.map((post) => {
          const myUsername = socialUser?.username;
          const isLiked = post?.likes?.likedBy.some(
            (user) => user.username === myUsername
          );
          const isOwner = post?.username === socialUser?.username;

          return (
            <li className="post-list" key={post._id}>
              <div>
                <img className="profile-pic" src={post.profilePic}alt="profile" />
                <span>
                  <b>
                    {post.firstName} {post.lastName}
                  </b>
                </span>
                <span>@{post.username}</span>
              </div>
              <p>{post.content}</p>
              <div>
                {post.mediaUrl && (
                  <img
                    src={post.mediaUrl}
                    alt="random"
                    height="250px"
                    width="300px"
                    borderradius="2rem"
                  />
                )}
              </div>
              <div className="btns">
               
                {isBookmarked(post._id) ? (
                  <span
                    style={{ color: "red" }}
                    onClick={() => removeBookmarkPosts(post._id)}
                  >
                    <i className="fa fa-bookmark"></i>
                  </span>
                ) : (
                  <span onClick={() => addBookmarkPosts(post._id)}>
                    <i className="fa fa-bookmark"></i>
                  </span>
                )}

                {isLiked ? (
                  <span
                    style={{ color: "red" }}
                    onClick={() => getUnLikedPosts(post._id)}
                  >
                    <i className="fa fa-heart"></i>
                    {post.likes.likeCount}
                  </span>
                ) : (
                  <span onClick={() => getLikedPosts(post._id)}>
                    <i className="fa fa-heart"></i>
                    {post.likes.likeCount}
                  </span>
                )}
                <span>
                  <i className="fa fa-comment"></i>
                  {post.comments?.length > 0 && post.comments?.length}
                </span>
                {isOwner && (
                  <span onClick={() => deletePosts(post._id)}>
                    <i className="fa fa-trash"></i>
                  </span>
                )}
              </div>
             
            </li>
          );
        })}
      </ul>
      <div>
        <Suggestions />
      </div>
    </div>
  );
}
