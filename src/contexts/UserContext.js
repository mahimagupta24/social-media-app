import { useReducer, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { FeatureContext } from "./FeatureContext";

export const UserContext = createContext();
const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      console.log("Get user action!");
      return { ...state, users: action.payload };
    case "ADD_BOOKMARK_POSTS":
      return { ...state, bookmarks: action.payload };
    case "FOLLOW_USER":
      // console.log("follow user action!");
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
      case "UNFOLLOW_USER":
        return {
          ...state,
          users: state.users.map((user) =>
            user._id === action.payload._id ? action.payload : user
          ),
        }
    default:
      return state;
  }
};

export default function UserProvider({ children }) {
  const initialState = {
    users: [],
    bookmarks: [],
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  const { user, setUser } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const { setUserPosts,setPosts } = useContext(FeatureContext);

  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: "GET_USERS", payload: data.users });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleFollow = async (followId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/follow/${followId}`, {
        method: "POST",
        headers: { authorization: `bearer${token}` },
        body: JSON.stringify({}),
      });

      if (response.status === 200) {
        const data = await response.json();

        // setUser(data.user);
        const followedUser = data.followUser;

        dispatch({ type: "FOLLOW_USER", payload: followedUser });

        setUser((user) => ({ ...user, following: data.user.following }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUnFollow = async (followId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/unfollow/${followId}`, {
        method: "POST",
        headers: { authorization: `bearer${token}` },
        body: JSON.stringify({}),
      });

      if (response.status === 200) {
        const data = await response.json();

        // setUser(data.user);
        const followedUser = data.followUser;

        dispatch({ type: "UNFOLLOW_USER", payload: followedUser });

        setUser((user) => ({ ...user, following: data.user.following }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addBookmarkPosts = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      dispatch({ type: "ADD_BOOKMARK_POSTS", payload: data.bookmarks });
      setUser((user) => ({ ...user, bookmarks: data.bookmarks }));
    } catch (e) {
      console.error(e);
    }
  };

  const removeBookmarkPosts = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/remove-bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify({}),
      });

      if (response.status === 200) {
        const data = await response.json();

        // dispatch({ type: "REMOVE_BOOKMARK_POSTS", payload:data.bookmarks});
        setUser((user) => ({ ...user, bookmarks: data.bookmarks }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const editUserInfo = async (data) => {
    const token = localStorage.getItem("token");
    const userData = {
      bio: data.bio,
      profilePic: data.profilePic,
      website: data.website,
    };
    try {
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify({ userData }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log(data.user);
        setUser(data.user);
        setUserPosts((posts) =>
          posts.map((post) =>
            post.username === data.user.username
              ? { ...post, profilePic: data.user.profilePic }
              : post
          )  
        );
        setPosts((posts) =>
          posts.map((post) =>
            post.username === data.user.username
              ? { ...post, profilePic: data.user.profilePic }
              : post
          )  
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const allUsers = state.users;
  const myFollowing = user?.following;
const suggestedUsers = allUsers
  .filter(({ _id }) => _id !== user?._id)
  .filter(
    (user) =>
      !myFollowing?.some((followedUser) => followedUser._id === user._id)
  );

  // suggestedUsers =searchText!=="" ?suggestedUsers.filter(({username})=>username.includes(searchText)):suggestedUsers

  return (
    <UserContext.Provider
      value={{
        state,
        addBookmarkPosts,
        removeBookmarkPosts,
        searchText,
        // searchedUsers,
        setSearchText,
        handleFollow,
        handleUnFollow,
        editUserInfo,
        suggestedUsers
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
