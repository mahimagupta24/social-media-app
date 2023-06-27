import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeatureContext } from "../../contexts/FeatureContext";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import ProfileDetailsCard from "./ProfileDetailsCard";

export default function Profile() {
  const { username } = useParams();

  const { user } = useContext(AuthContext);

  const { handleFollow, state } = useContext(UserContext);

  const { userPosts } = useContext(FeatureContext);

   console.log(userPosts)
  // console.log(user.profilePic)

  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // console.log(state.users);
  // console.log(username);

  const userProfile = state.users.find((user) => user.username === username);
  // console.log(userProfile);

  //  const suggestedUser = userPosts.find(({username})=>username===username)
  //  console.log(suggestedUser)

  const handleEditInfo = () => {
    setShowProfileDetails(true);
  };
  return (
    <div className="post-container">
      <ul className="post-card">
        {username === user?.username ? (
          <div className="user-profile">
            <img className="profile-pic" src={user?.profilePic} />
            <span>{user?.fullname}</span>
            <p className="user-bio">{user?.bio}</p>
            <a href={user?.website} target="_blank">
              {user?.website}
            </a>
            <p>
              <span>Post:{userPosts.length}</span>
              <span>Followers:{user?.followers.length}</span>{" "}
              <span>Following:{user?.following.length}</span>
            </p>
            <button className="edit-profile-btn" onClick={handleEditInfo}>
              Edit
            </button>
            {showProfileDetails && (
              <ProfileDetailsCard
                showProfileDetails={showProfileDetails}
                setShowProfileDetails={setShowProfileDetails}
              />
            )}
          </div>
        ) : (
          <div className="user-profile">
            <img className="profile-pic" src={userProfile?.profilePic} />
            <span>{userProfile?.fullname}</span>
            <p className="user-bio">{userProfile?.bio}</p>
            <p>
            <span>Post:{userPosts.length}</span>
              <span>Followers:{userProfile?.followers.length}</span>{" "}
              <span>Following:{userProfile?.following.length}</span>
            </p>
            <button
              onClick={() => handleFollow(userProfile?._id)}
              className="edit-profile-btn"
            >
              Follow
            </button>
          </div>
        )}

        {userPosts.map(
          ({
            _id,
            content,
            username,
            profilePic,
            mediaUrl,
            firstName,
            lastName,
          }) => (
            <li className="post-list" key={_id}>
              <img className="profile-pic" src={profilePic} alt="profile" />
              <span>
                {firstName} {lastName}
              </span>
              <span>@{username}</span>
              <p>{content}</p>
              {mediaUrl && (
                <img src={mediaUrl} alt="random" height="250px" width="300px" />
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
