import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeatureContext } from "../../contexts/FeatureContext";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";


export default function Profile() {
  const { username } = useParams();

   const { user } = useContext(AuthContext);
 
  const { state} = useContext(UserContext);
  const { userPosts} = useContext(FeatureContext);
  
  
   const suggestedUsers = state.users.filter(({ _id }) => _id !== user._id);
   console.log(suggestedUsers);

   const suggestedUser = userPosts.find(({username})=>username===username)
   console.log(suggestedUser)
  
  


  
  return (
    <div className="post-container">
     
      <ul className="post-card">
      
        {username===user.username&&
        <div className="user-profile">
      <img className="profile-pic"src={user.profilePic}/>
      <span>{user.fullname}</span>
      <p className="user-bio">{user.bio}</p>
      <button className="edit-profile-btn">Edit</button>
      </div>}
      {userPosts.map(({ _id, content, username, profilePic, mediaUrl,firstName,lastName }) => (
        <li className="post-list" key={_id}>
          <img
                className="profile-pic"
                src={profilePic}
                alt="profile"
              />
          <span>{firstName} {lastName}</span>
          <span>@{username}</span>
          <p>{content}</p>
          {mediaUrl && (
            <img src={mediaUrl} alt="random" height="250px" width="300px" />
          )}
        </li>
  
      ))}
    </ul>

    </div>
  );
}
