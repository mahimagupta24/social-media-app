import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import "./Profile.css";
import { FeatureContext } from "../../contexts/FeatureContext";

export default function ProfileDetailsCard({ setShowProfileDetails }) {
  const { user } = useContext(AuthContext);
  const { editUserInfo } = useContext(UserContext);
  const { posts, EditPost } = useContext(FeatureContext);
  const [profileDetails, setProfileDetails] = useState({
    profilePic: user.profilePic,
    bio: user.bio,
    website: user.website,
  });

  const handleImageClick = (e) => {
    setProfileDetails({ ...profileDetails, profilePic: e.target.src });
  };

  const handleSaveProfile = () => {
    editUserInfo(profileDetails);
    const loggedUserPosts = posts.filter(
      ({ username }) => username === user.username
    );
    loggedUserPosts.forEach((post) =>
      EditPost(post._id, post.content, post.mediaUrl, profileDetails.profilePic)
    );

    setShowProfileDetails(false);
  };
  const handleCancel = () => {
    setShowProfileDetails(false);
  };

  return (
    <div className="modal-form-container">
      <h2>Edit Profile</h2>

      <div className="images-options">
        <img
          className="profile-options"
          src="https://tse1.mm.bing.net/th?id=OIP.GIX5K_H6IcDTpUBcApSiEQHaHa&pid=Api&P=0&h=180"
          alt="profile-pic"
          onClick={handleImageClick}
        />
        <img
          className="profile-options"
          src="https://tse4.mm.bing.net/th?id=OIP.MUtWvqmGVFkhQJLgUhvKHQHaLH&pid=Api&P=0&h=180"
          alt="profile-pic"
          onClick={handleImageClick}
        />
        <img
          className="profile-options"
          src="https://tse2.mm.bing.net/th?id=OIP.QVa11uJQuzec9W2zomuuqAHaHM&pid=Api&P=0&h=180"
          alt="profile-pic"
          onClick={handleImageClick}
        />
        <img
          className="profile-options"
          src="https://3.bp.blogspot.com/-XSj6iAqP9OA/T3ACkQziSRI/AAAAAAAAMtU/_2wbhQJBVxE/s1600/270767_10150360223095299_232640290298_10103098_4606695_n.jpg"
          alt="profile-pic"
          onClick={handleImageClick}
        />
        <img
          className="profile-options"
          src="https://tse2.mm.bing.net/th?id=OIP.80LnWzLMWNSz7FcHilrsngHaGl&pid=Api&P=0&h=180"
          alt="profile-pic"
          onClick={handleImageClick}
        />
      </div>
      <div className="profileDetails">
        <div>
          <label>
            <b>Bio</b>
          </label>{" "}
          <input
            className="profileInput"
            value={profileDetails.bio}
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, bio: e.target.value })
            }
          />
        </div>
        <label>
          <b>Link</b>
        </label>{" "}
        <input
          className="profileInput"
          value={profileDetails.website}
          onChange={(e) =>
            setProfileDetails({ ...profileDetails, website: e.target.value })
          }
        />
      </div>
      <div className="save-cancel-btn">
        <button className="save-btn" onClick={handleSaveProfile}>
          Save
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
