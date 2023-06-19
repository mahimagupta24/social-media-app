import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeatureContext } from "../../contexts/FeatureContext";

export default function Profile() {
  const { username } = useParams();

  console.log(username);

  const{userPosts,getUserPosts} = useContext(FeatureContext)
  console.log(userPosts)

  
  return (
    <div>
      {userPosts.map(({_id, content, username, createdAt, mediaUrl}) => (
        <li key={_id}>
             <h3>{username}</h3>
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
