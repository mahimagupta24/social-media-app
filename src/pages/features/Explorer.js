import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Explorer() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const fetchAllPosts = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "GET",
      });
      if (response.status === 200) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);
  console.log(posts);
  const onUsernameClickHandler = (name) => {
    navigate(`/profile/${name}`);
  };
  return (
    <div>
      <ul>
        {posts.map(({ _id, content, username, createdAt, mediaUrl }) => (
          <li key={_id} onClick={() => onUsernameClickHandler(username)}>
            <h3>{username}</h3>
            <span>{createdAt}</span>
            <p>{content}</p>
            {mediaUrl && (
              <img src={mediaUrl} alt="random" height="250px" width="300px" />
            )}
            <div>
              <span>
                <i className="fa fa-heart"></i>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
