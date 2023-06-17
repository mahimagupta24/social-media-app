import { useContext } from "react";
import { FeatureContext } from "../../contexts/FeatureContext";

export default function Explorer() {
  const { posts } = useContext(FeatureContext);

  return (
    <div>
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
            <h2>
              {firstName} {lastName}
            </h2>
            <h5>@{username}</h5>
            <span>{createdAt}</span>
            <p>{content}</p>
            {mediaUrl && (
              <img src={mediaUrl} alt="random" height="250px" width="300px" />
            )}
          </li>
        )
      )}
    </div>
  );
}
