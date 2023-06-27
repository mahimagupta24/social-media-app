import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AuthContext } from "../contexts/AuthContext";
import "./components.css";
export default function Suggestions() {
  const { state, handleFollow,suggestedUsers } = useContext(UserContext);
  const { user: loggedInUser } = useContext(AuthContext);

 

  // const allUsers = state.users;
  // const myFollowing = loggedInUser.following;

  // const suggestedUsers = allUsers
  //   .filter(({ _id }) => _id !== loggedInUser._id)
  //   .filter(
  //     (user) =>
  //       !myFollowing.some((followedUser) => followedUser._id === user._id)
  //   );

  return (
    <div className="suggestion-container">
      <h1>Suggested users</h1>
      {suggestedUsers.map(({ _id, fullname, username, profilePic }) => (
        <div className="suggestion-list" key={_id}>
          <img className="profile-pic" src={profilePic} />
          <div className="suggested-user-details">
            <span>
              <b>{fullname}</b>
            </span>
            <span>@{username}</span>
          </div>
          <button onClick={() => handleFollow(_id)}>Follow</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
