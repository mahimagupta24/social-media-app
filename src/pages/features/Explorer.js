import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FeatureContext } from "../../contexts/FeatureContext";

export default function Explorer() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showlikedPost, setShowLikedPost] = useState(false);
  // const { getLikedPosts, getUnLikedPosts } = useContext(FeatureContext);
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

  const onUsernameClickHandler = (name) => {
    navigate(`/profile/${name}`);
  };

  // const handleLikePost = (postId) => {
  //   getLikedPosts(postId);
  // };

  // const handleUnlikePost = (postId) => {
  //   getUnLikedPosts(postId);
  //   setShowLikedPost(true);
  // };
  return (
    <div>
      <ul>
        {posts.map(
          ({
            _id,
            content,
            firstName,
            lastName,
            username,
            createdAt,
            mediaUrl,
            likes,
          }) => (
            <li key={_id}>
              <h2 onClick={() => onUsernameClickHandler(username)}>
                {firstName} {lastName}
              </h2>
              <h5>@{username}</h5>
              <span>{createdAt}</span>
              <p>{content}</p>
              {mediaUrl && (
                <img src={mediaUrl} alt="random" height="250px" width="300px" />
              )}
              {/* <div>
                {showlikedPost && (
                  <span onClick={() => handleUnlikePost(_id)}>
                    <i className="fa fa-heart"></i>
                  </span>
                ) }
                {!showlikedPost&&
                  <span onClick={() => handleLikePost(_id)}>
                  
                    <i className="fa fa-heart"></i>
                  </span>
}
              </div> */}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
