import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";
import { FeatureContext } from "../../contexts/FeatureContext";
import SideBar from "../../components/sideBar";
import Suggestions from "../../components/suggestions";

export default function Bookmark() {
  const { user } = useContext(AuthContext);
  const { posts, getLikedPosts, getUnLikedPosts } = useContext(FeatureContext);
  console.log(user);

  return (
    <div className="post-container">
     
       <div>
        <SideBar />
      </div>

      <ul className="post-card">
      <h1 style={{textAlign:"center"}}> My Bookmarks</h1>
     
      {user?.bookmarks.map((bookmark) => {
        const post = posts.find(
          ({ content }) => content === bookmark.content
        );
        const myUsername = user?.username;
        const isLiked = post?.likes?.likedBy.some(
          ({ username }) => username === myUsername
        );
  
        return (
          <div className="post-list" key={post._id}>
            <div className="profile-details">
              <img className="profile-pic" src={post.profilePic} />
              <span>{post.firstName} {post.lastName}</span>
              <span className="profile-username">@{post.username}</span>
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
          </div>
          </div>
        );
      })}
      </ul>
      <div>
        <Suggestions />
      </div>
    </div>
  );
}
