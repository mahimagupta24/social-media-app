import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeatureContext } from "../../contexts/FeatureContext";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

export default function Profile() {
  const { username } = useParams();

   const { user } = useContext(AuthContext);
// console.log(user)
// console.log(user?.following)
  const { state,followUsers} = useContext(UserContext);
  const { userPosts} = useContext(FeatureContext);

  console.log(state.followUser)
console.log(state.user)
   const suggestedUsers = state.users.filter(({ _id }) => _id !== user._id);
   console.log(suggestedUsers);

   const suggestedUser = suggestedUsers.find(user=>user.username===username)
  // const loggedInUserPosts = userPosts.filter(
  //   ({ username }) => username === user.username
  // );


  
  return (
    <div>
      {username === state.user.username ? (
        <div>
          <p>{state.user.fullname}</p>
          <p>@{state.user.username}</p>
          <p>{state.user.bio}</p>
          <p><span>Followers:{state.user.followers.length}</span><span>Following:{state.user.following.length}</span></p>
          <button>Edit</button>
        </div>
      ) : (
        <div>
          <p>{state.followUser?.fullname}</p>
          <p>@{username}</p>
          <p>{suggestedUser?.bio}</p>
          <p><span>Followers:{suggestedUser?.followers.length}</span><span>Following:{suggestedUser?.following.length}</span></p>
          <button onClick={()=>followUsers(suggestedUser?._id)}>Follow</button>
        </div>
      )}
      {userPosts.map(({ _id, content, username, createdAt, mediaUrl,firstName,lastName }) => (
        <li key={_id}>
          <h2>{firstName} {lastName}</h2>

          <h3>@{username}</h3>
          <span>{createdAt}</span>
          <p>{content}</p>
          {mediaUrl && (
            <img src={mediaUrl} alt="random" height="250px" width="300px" />
          )}
        </li>
      ))}
    </div>
  );
}
