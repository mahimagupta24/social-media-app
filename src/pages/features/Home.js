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
  const { user, dispatch, addBookmarkPosts, removeBookmarkPosts, state } =
    useContext(UserContext);
  console.log(state?.bookmarkPosts);
  // const { getLikedPosts, getUnLikedPosts } = useContext(FeatureContext);

  // const handleLikePost = (postId) => {
  //   getLikedPosts(postId);
  // };

  // const handleUnlikePost = (postId) => {
  //   getUnLikedPosts(postId);
  //   setShowLikedPost(true);
  // };
  const socialUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    getUserPosts(user?.username);
  }, [user?.username]);

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
  console.log(posts);
  const loggedInUserPosts = posts?.filter(
    (post) => post?.username === socialUser?.username
  );

  const followingPosts = posts?.filter((post) =>
    user?.following?.some((el) => el.username === post.username)
  );

  const isBookmarked = (id) =>
    state?.bookmarkPosts?.some(({ _id }) => _id === id);

  const allPosts = [...loggedInUserPosts, ...followingPosts];

  const handlePostSubmit = (e) => {
    addNewPost(newPost);
    setNewPost("");
    console.log("abc");
  };

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };
  return (
    <div>
      <SideBar />
      <Suggestions />

      <textarea onChange={handlePostChange} value={newPost}></textarea>
      <button onClick={handlePostSubmit}>Post</button>
      <button>Latest Post</button>
      <ul>
        {allPosts.map((post) => {
          const myUsername = socialUser.username;
          const isLiked = post.likes.likedBy.some(
            (user) => user.username === myUsername
          );
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
              <button onClick={() => deletePosts(post._id)}>Delete</button>
              {isBookmarked(post._id) ? (
                <span onClick={() => removeBookmarkPosts(post._id)}>
                  <i className="fa fa-bookmark"></i>
                </span>
              ) : (
                <span onClick={() => addBookmarkPosts(post._id)}>
                  <i className="far fa-bookmark"></i>
                </span>
              )}
              {isLiked ? (
                <span
                  style={{ color: "pink" }}
                  onClick={() => getUnLikedPosts(post._id)}
                >
                  <i className="fa fa-heart"></i>
                </span>
              ) : (
                <span onClick={() => getLikedPosts(post._id)}>
                  <i className="fa fa-heart"></i>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
