import { useContext } from "react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { FeatureContext } from "../../contexts/FeatureContext";

export default function Explorer() {
  const { allposts, setAllPosts, onUsernameClickHandler } =
    useContext(FeatureContext);
  // const [showlikedPost, setShowLikedPost] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  // const { getLikedPosts, getUnLikedPosts } = useContext(FeatureContext);

  // const handleLikePost = (postId) => {
  //   getLikedPosts(postId);
  // };

  // const handleUnlikePost = (postId) => {
  //   getUnLikedPosts(postId);
  //   setShowLikedPost(true);
  // };
  const handleSortedPost = () => {
    if (!sortOrder) {
      const sortedPosts = [...allposts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAllPosts(sortedPosts);
      
    } else {
      setAllPosts([...allposts]);   
    }
  };
  return (
    <div>
      <ul>
        <button onClick={handleSortedPost}>Latest Post</button>
        {allposts.map(
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
