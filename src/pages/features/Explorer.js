import { useContext } from "react";
import { FeatureContext } from "../../contexts/FeatureContext";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import Header from "../../components/Header";
import SideBar from "../../components/sideBar";
import Suggestions from "../../components/suggestions";
import { AuthContext } from "../../contexts/AuthContext";

export default function Explorer() {
  const { posts, getUserPosts, getLikedPosts, getUnLikedPosts } =
    useContext(FeatureContext);
    const{addBookmarkPosts,removeBookmarkPosts}=useContext(UserContext)
    const{user} =useContext(AuthContext)

  const navigate = useNavigate();

  const socialUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const isBookmarked = (postId) =>
    user?.bookmarks?.find((bookmark) => bookmark._id === postId);

  const handleUserPosts = (username) => {
    getUserPosts(username);
    navigate(`/profile/${username}`);
  };
  console.log(posts)
  return (
    <div>
        <Header/>
    <div className="post-container">
      
      <div>
        <SideBar />
      </div>

     
      <ul className="post-card">
        {posts.map(( post ) => {
           const myUsername = socialUser.username;
           const isLiked = post?.likes?.likedBy.some(
             (user) => user.username === myUsername
           );
          return <li 
            className="post-list"
            key={post?._id}
            
          >
            <div>
              <img 
                className="profile-pic"
                src={post?.profilePic}
                alt="profile"
              />
              <span style={{cursor:"pointer"}} onClick={() => handleUserPosts(post.username)}>
                {post?.firstName} {post?.lastName}
              </span>
              <span>@{post?.username}</span>
            </div>
            <p>{post?.content}</p>
            <div>
              {post?.mediaUrl && (
                <img 
                  src={post?.mediaUrl}
                  alt="random"
                  height="250px"
                  width="300px"
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
                {post?.comments?.length > 0 && post?.comments?.length}
              </span>
            </div>
          </li>
})}
      </ul>
      <div>
        <Suggestions/>
      </div>
    </div>
    </div>
  );
}
