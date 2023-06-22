import { useContext } from "react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { FeatureContext } from "../../contexts/FeatureContext";
import SideBar from "../../components/sideBar";
import Suggestions from "../../components/suggestions";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

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

    const {user} = useContext(AuthContext)
  // const handleLikePost = (postId) => {
  //   getLikedPosts(postId);
  // };

  // const handleUnlikePost = (postId) => {
  //   getUnLikedPosts(postId);
  //   setShowLikedPost(true);
  // };

  const socialUser = JSON.parse(localStorage.getItem("loggedInUser"));

  console.log(posts);

  useEffect(() => {
    getUserPosts(socialUser.username);
  }, [socialUser.username]);

  // const postLikings = posts.filter((post) => post?.likes?.likedBy?.length > 0);
  // const sortLikedPosts = [
  //   ...postLikings.sort(
  //     (a, b) => a.likes.likedBy.length - a.likes.likedBy.length
  //   ),
  // ];

  // const handleSortedPost = () => {
  //   if (!sortOrder) {
  //     const sortedPosts = [...posts].sort(
  //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //     );
  //     setPosts(sortedPosts);
  //   } else {
  //     setPosts([...posts]);
  //   }
  // };

  const loggedInUserPosts = posts?.filter(
    (post) => post?.username === socialUser?.username
  );


  const followingPosts = posts?.filter((post) =>
    user?.following?.some((el) => el.username === post.username)
  );

  // console.log(followingPosts);

  const allPosts = [...loggedInUserPosts, ...followingPosts];

  const handlePostSubmit = () => {
    addNewPost(newPost);
    setNewPost("");
  };

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };


  
    const isBookmarked = (postId)=>user?.bookmarks?.find(
      (bookmark) => bookmark._id === postId
    );
  
   

  return (
    <div>
      <SideBar />
      <Suggestions />

      <textarea onChange={handlePostChange} value={newPost}></textarea>
      <button onClick={handlePostSubmit}>Post</button>
      <button>Latest Post</button>
      <ul>
        {allPosts.map((post) => {
          const myUsername = socialUser?.username;
          const isLiked = post?.likes?.likedBy.some(
            (user) => user.username === myUsername
          );
          const isOwner = post?.username === socialUser?.username;
          return (
            <li key={post._id}>
              <div>
                <span>
                  {post.firstName} {post.lastName}
                </span>
                <span>@{post.username}</span>
              </div>
              <div>
                {post.mediaUrl && (
                  <img
                    src={post.mediaUrl}
                    alt="random"
                    height="250px"
                    width="300px"
                  />
                )}
              </div>
              <p>{post.content}</p>
              {isOwner&&<button onClick={() => deletePosts(post._id)}>Delete</button>}
              {isBookmarked(post._id)? <span onClick={() => removeBookmarkPosts(post._id)}>
                  <i className="fa fa-bookmark"></i>
                </span>
          :
                <span
                  style={{ color: "red" }}
                  onClick={() => addBookmarkPosts(post._id)}
                >
                  <i className="fa fa-bookmark"></i>
                </span>
            }
              {isLiked ? (
                <span onClick={() => getUnLikedPosts(post._id)}>
                  <i className="fa fa-heart"></i>
                </span>
              ) : (
                <span
                  style={{ color: "red" }}
                  onClick={() => getLikedPosts(post._id)}
                >
                  <i className="fa fa-heart"></i>
                </span>
               
              )}
              <span><i className="fa fa-comment"></i>{post.comments.length}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
