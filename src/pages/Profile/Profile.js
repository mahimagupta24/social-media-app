import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeatureContext } from "../../contexts/FeatureContext";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import ProfileDetailsCard from "./ProfileDetailsCard";
import Header from "../../components/Header";
import Suggestions from "../../components/suggestions";
import SideBar from "../../components/sideBar";

export default function Profile() {
  const { username } = useParams();

  const { user } = useContext(AuthContext);

  const {
    handleFollow,
    handleUnFollow,
    state,
    addBookmarkPosts,
    removeBookmarkPosts,
  } = useContext(UserContext);

  const { posts, userPosts, getLikedPosts, getUnLikedPosts } =
    useContext(FeatureContext);

  const loggedInUserPosts = posts.filter((post) => post.username === username);
  //  console.log(user.profilePic)
   console.log(loggedInUserPosts)

  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // console.log(state.users);
   console.log(posts);

  const userProfile = state.users.find((user) => user.username === username);
  // console.log(userProfile);

  //  const suggestedUser = userPosts.find(({username})=>username===username)
  //  console.log(suggestedUser)

  const isFollowed = user?.following?.some(
    ({ username }) => username === userProfile?.username
  );
  // console.log(isFollowed)
  const isBookmarked = (postId) =>
    user?.bookmarks?.find((bookmark) => bookmark._id === postId);

  const socialUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <div>
      <Header />
      <div className="post-container">
        <div>
          <SideBar />
        </div>
        <div >
          {username === user?.username ? (
            <div className="profile">
              <img className="profile-pic" src={user?.profilePic} />
              <span>{user?.fullname}</span>
              <p className="user-bio">{user?.bio}</p>
              <a href={user?.website} target="_blank">
                {user?.website}
              </a>
              <p>
                <span>Post:{loggedInUserPosts.length}</span>
                <span>Followers:{user?.followers.length}</span>{" "}
                <span>Following:{user?.following.length}</span>
              </p>
              <button className="edit-profile-btn" onClick={()=>setShowProfileDetails(true)}>
                Edit
              </button>
              <div>
              {showProfileDetails && (
                <ProfileDetailsCard
                  // showProfileDetails={showProfileDetails}
                  setShowProfileDetails={setShowProfileDetails}
                />
              )}
              </div>
            </div>
          ) : (
            <div className="profile">
              <img className="profile-pic" src={userProfile?.profilePic} />
              <span>{userProfile?.fullname}</span>
              <p className="user-bio">{userProfile?.bio}</p>
              <p>
                <span>Post:{loggedInUserPosts.length}</span>{" "}
                <span>Followers:{userProfile?.followers.length}</span>{" "}
                <span>Following:{userProfile?.following.length}</span>
              </p>
              {isFollowed ? (
                <button
                  onClick={() => handleUnFollow(userProfile?._id)}
                  className="edit-profile-btn"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(userProfile?._id)}
                  className="edit-profile-btn"
                >
                  Follow
                </button>
              )}
            </div>
          )}

          {loggedInUserPosts.map(
            ({
              _id,
              content,
              username,
              profilePic,
              mediaUrl,
              firstName,
              lastName,
              likes,
              comments,
            }) => {
              const myUsername = socialUser.username;
              const isLiked = likes?.likedBy.some(
                (user) => user.username === myUsername
              );
              return (
                <li className="post-list" key={_id}>
                  <img className="profile-pic" src={profilePic} alt="profile" />
                  <span>
                    {firstName} {lastName}
                  </span>
                  <span>@{username}</span>
                  <p>{content}</p>
                  {mediaUrl && (
                    <img
                      src={mediaUrl}
                      alt="random"
                      height="250px"
                      width="300px"
                    />
                  )}
                  <hr/>
                  <div className="rest-btns">
                    {isBookmarked(_id) ? (
                      <span
                        style={{ color: "red" }}
                        onClick={() => removeBookmarkPosts(_id)}
                      >
                        <i className="fa fa-bookmark"></i>
                      </span>
                    ) : (
                      <span onClick={() => addBookmarkPosts(_id)}>
                        <i className="fa fa-bookmark"></i>
                      </span>
                    )}
                    {isLiked ? (
                      <span
                        style={{ color: "red" }}
                        onClick={() => getUnLikedPosts(_id)}
                      >
                        <i className="fa fa-heart"></i>
                        {likes.likeCount}
                      </span>
                    ) : (
                      <span onClick={() => getLikedPosts(_id)}>
                        <i className="fa fa-heart"></i>
                        {likes.likeCount}
                      </span>
                    )}
                    <span>
                      {" "}
                      <i className="fa fa-comment"></i>
                      {comments?.length > 0 && comments?.length}
                    </span>
                  </div>
                </li>
              );
            }
          )}
        </div>

        <div>
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
