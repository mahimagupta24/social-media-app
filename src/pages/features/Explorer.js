import { useContext } from "react";
import { FeatureContext } from "../../contexts/FeatureContext";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function Explorer() {
  const { posts, getUserPosts, getLikedPosts, getUnLikedPosts } =
    useContext(FeatureContext);
    const{addBookmarkPosts,removeBookmarkPosts}=useContext(UserContext)

  const navigate = useNavigate();

  const socialUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleUserPosts = (username) => {
    getUserPosts(username);
    navigate(`/profile/${username}`);
  };
  console.log(posts)
  return (
    <div className="post-container">
      <ul className="post-card">
        {posts.map(( post ) => {
          //  const myUsername = socialUser.username;
          //  const isLiked = post?.likes?.likedBy.some(
          //    (user) => user.username === myUsername
          //  );
          //  console.log(isLiked)
          //  console.log(myUsername)
          return <li
            className="post-list"
            key={post?._id}
            onClick={() => handleUserPosts(post.username)}
          >
            <div>
              <img
                className="profile-pic"
                src={post?.profilePic}
                alt="profile"
              />
              <span>
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
              {/* {isBookmarked(post._id) ? (
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
              )} */}

              {/* {isLiked ? (
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
              )} */}
              <span>
                <i className="fa fa-comment"></i>
                {post?.comments?.length > 0 && post?.comments?.length}
              </span>
            </div>
          </li>
})}
      </ul>
    </div>
  );
}
