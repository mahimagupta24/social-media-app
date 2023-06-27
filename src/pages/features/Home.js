import { useContext } from "react";
import { useEffect, useState } from "react";
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
    getUserPosts,
    setNewPost,
    addNewPost,
    getLikedPosts,
    getUnLikedPosts,
    newPost,
    deletePosts,
    editingPost,
    setEditingPost,
    EditPost,
  } = useContext(FeatureContext);
  const navigate = useNavigate()

  const { addBookmarkPosts, removeBookmarkPosts, state } =
    useContext(UserContext);

  const { user } = useContext(AuthContext);
  const [showEditingData, setShowEditingData] = useState(false);
  const [editContent, setEditContent] = useState();
  const[editId,setEditId] = useState()
  const[selectedPic,setSelectedPic]= useState()

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
       getUserPosts(username);
      navigate(`/profile/${username}`);
    };

     const handleEditPost = (id,content,mediaUrl)=>{
    EditPost(id,content,mediaUrl)
     setShowEditingData(false)
     }
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
              <li className="post-list" key={post._id}>
                <div>
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
                  <span onClick={()=>handleUserPosts(post.username)}>@{post.username}</span>
                  <span>{post.createdAt}</span>
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
                    <div>
                      <button
                        onClick={() => {
                          setEditContent(post.content);
                           setShowEditingData(true);
                          setEditId(post._id)
                        }}
                      >
                        Edit
                      </button>
                      {showEditingData&&editId===post._id &&  (
                        <div>
                          <input value={editContent}onChange={
                            (e)=>setEditContent(e.target.value)
                            }/>
                            <input type="file"accept="image/*"onChange={(e)=>setSelectedPic(e.target.files[0])}/>
                          <button onClick={() => handleEditPost(post._id,editContent,selectedPic)}>
                            Save
                          </button>
                          <button onClick={()=>setShowEditingData(false)}>Cancel</button>
                        </div>
                      )}
                      
                      <span onClick={() => deletePosts(post._id)}>
                        <i className="fa fa-trash"></i>
                      </span>
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
