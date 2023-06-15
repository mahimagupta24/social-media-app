import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();

  console.log(username);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts)
  const getUserPosts = async () => {
    try {
      const response = await fetch(`/api/posts/user/${username}`);
      if (response.status === 200) {
        const data = await response.json();
        setUserPosts(data.posts);
        console.log(data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getUserPosts();
  }, []);

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
