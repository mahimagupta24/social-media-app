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
  const { user, dispatch, addBookmarkPosts, removeBookmarkPosts, state } =
    useContext(UserContext);
  console.log(state?.bookmarkPosts);
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

  const getUserPosts = async (username) => {
    try {
      const response = await fetch(`/api/posts/user/${username}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("posts", data);
      dispatch({ type: "GET_USER_POSTS", payload: data.posts });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getUserPosts();
  }, []);

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

  const loggedInUserPosts = posts?.filter(
    (post) => post?.username === socialUser?.username
  );

  const followingPosts = posts.filter((post) =>
    user?.following?.some((el) => el.username === post.username)
  );

   const isBookmarked = (id)=>state?.bookmarkPosts?.some(({ _id }) => _id === id);

  const allPosts = [...loggedInUserPosts, ...followingPosts];

  return (
    <div>
      <SideBar />
      <Suggestions />
      <ul>
        <button onClick={handleSortedPost}>Latest Post</button>

        {allPosts.map((post) => (
          <li>
            {post.content}
            {isBookmarked(post._id) ?<span onClick={() => removeBookmarkPosts(post._id)}>
              <i className="far fa-bookmark"></i>
            </span>:<span onClick={() => addBookmarkPosts(post._id)}>
              <i className="fa fa-bookmark"></i>
            </span>}
            
            
          </li>
        ))}
      </ul>
    </div>
  );
}
