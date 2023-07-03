import { useContext } from "react";
import { useState } from "react";
import { FeatureContext } from "../../contexts/FeatureContext";
import SideBar from "../../components/sideBar";
import Suggestions from "../../components/suggestions";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import "./features.css";
import Header from "../../components/Header";
import { useNavigate } from "react-router";

export default function Home() {
  const {
    posts,
    setPosts,
    setNewPost,
    addNewPost,
    getLikedPosts,
    getUnLikedPosts,
    newPost,
    deletePosts,
    EditPost,
    // getUserPosts
  } = useContext(FeatureContext);
  const navigate = useNavigate();

  const { addBookmarkPosts, removeBookmarkPosts } = useContext(UserContext);

  const { user } = useContext(AuthContext);
  const [showEditingData, setShowEditingData] = useState(false);
  const [editContent, setEditContent] = useState();
  const [editId, setEditId] = useState();
  const [selectedPic, setSelectedPic] = useState();

  const socialUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // useEffect(() => {
  //   getUserPosts(socialUser.username);
  //   handleSortedPost();
  // }, [socialUser.username]);

  // const handleEdit = (id) => {
  //   setEditContent(id);
  //   setShowEditingData(true);
  //   console.log("1", id);

  // };

  const loggedInUserPosts = posts?.filter(
    (post) => post?.username === socialUser?.username
  );

  const followingPosts = posts?.filter((post) =>
    user?.following?.some((el) => el.username === post.username)
  );

  const allPosts = [...loggedInUserPosts, ...followingPosts];

  console.log(allPosts);

  const handleSortedPost = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setPosts(sortedPosts);
  };

  const sortLikedPosts = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => b.likes.likeCount - a.likes.likeCount
    );
    setPosts(sortedPosts);
  };

  const handlePostSubmit = () => {
    addNewPost(newPost);
    setNewPost("");
  };

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const isBookmarked = (postId) =>
    user?.bookmarks?.find((bookmark) => bookmark._id === postId);

  const handleUserPosts = (username) => {
    // getUserPosts(username);
    navigate(`/profile/${username}`);
  };

  const handleEditPost = (id, content, mediaUrl) => {
    EditPost(id, content, mediaUrl);
    setShowEditingData(false);
  };
  return (
    <div>
      <Header />
      <div className="post-container">
        <div>
          <SideBar />
        </div>

        <ul className="post-card">
          <div className="add-post-container">
            <input
              className="added-post-card"
              placeholder="What is happening"
              onChange={handlePostChange}
              value={newPost}
            />
          </div>
          <div>
            <button id="post-btn" onClick={handlePostSubmit}>
              Post
            </button>
          </div>

          <div className="sort-btns">
            <button id="sort-btn" onClick={handleSortedPost}>
              Latest Post
            </button>
            <button id="trending-btn" onClick={sortLikedPosts}>
              Trending
            </button>
          </div>

          {allPosts.map((post) => {
            const myUsername = socialUser?.username;
            const isLiked = post?.likes?.likedBy.some(
              (user) => user.username === myUsername
            );
            const isOwner = post?.username === socialUser?.username;

            return (
              <li
                className={`post-list ${
                  post.mediaUrl ? "with-media" : "without-media"
                }`}
                key={post._id}
              >
                <div>
                  <div className="profile-info">
                    <img
                      className="profile-pic"
                      src={post.profilePic}
                      alt="profile"
                    />

                    <span>
                      <b>
                        {post.firstName} {post.lastName}
                      </b>
                    </span>
                    <span onClick={() => handleUserPosts(post.username)}>
                      @{post.username}
                    </span>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
                <p>{post.content}</p>
                <div>
                  {post.mediaUrl && (
                    <img
                      src={post.mediaUrl}
                      alt="random"
                      height="250px"
                      width="300px"
                      borderradius="2rem"
                    />
                  )}
                </div>
                <hr />
                <div className="btns">
                  {isBookmarked(post._id) ? (
                    <span
                      style={{ color: "red" }}
                      onClick={() => removeBookmarkPosts(post._id)}
                    >
                      <i className="fa fa-bookmark"></i>
                    </span>
                  ) : (
                    <span onClick={() => addBookmarkPosts(post._id)}>
                      <i className="fa fa-bookmark"></i>
                    </span>
                  )}

                  {isLiked ? (
                    <span
                      style={{ color: "red" }}
                      onClick={() => getUnLikedPosts(post._id)}
                    >
                      <i className="fa fa-heart"></i>
                      {post.likes.likeCount}
                    </span>
                  ) : (
                    <span onClick={() => getLikedPosts(post._id)}>
                      <i className="fa fa-heart"></i>
                      {post.likes.likeCount}
                    </span>
                  )}
                  <span>
                    <i className="fa fa-comment"></i>
                    {post.comments?.length > 0 && post.comments?.length}
                  </span>

                  {isOwner && (
                    <div className="edit-delete">
                      <span onClick={() => deletePosts(post._id)}>
                        <i className="fa fa-trash"></i>
                      </span>
                      <span
                        onClick={() => {
                          setEditContent(post.content);
                          setShowEditingData(true);
                          setEditId(post._id);
                        }}
                      >
                        <i className="fa fa-edit"></i>
                      </span>
                      {showEditingData && editId === post._id && (
                        <div className="addPost-mainDiv">
                          <div className="post-input-main">
                            <h2>Edit post</h2>
                            {/* <div className="post-input"> */}
                            <input
                              id="input-text"
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                            />
                            {/* </div> */}
                            <div className="post-input">
                              <label for="file-upload">
                                <input
                                  id="file-upload"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    const imgUrl = URL.createObjectURL(file);
                                    setSelectedPic(imgUrl);
                                  }}
                                />
                                <span id="svg-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-2 h-2"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                  </svg>
                                </span>
                              </label>
                            </div>
                            <div className="save-cancel">
                              <button
                                onClick={() =>
                                  handleEditPost(
                                    post._id,
                                    editContent,
                                    selectedPic
                                  )
                                }
                              >
                                Save
                              </button>
                              <button
                                className="cancel-btn"
                                onClick={() => setShowEditingData(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <div>
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
