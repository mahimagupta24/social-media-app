import { useReducer, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();
const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "FOLLOW_USER":
      return { ...state, followUser: action.payload };
    case "GET_USER_POSTS":
      return { ...state, userPosts: action.payload };
    case "ADD_BOOKMARK_POSTS":
      return { ...state, bookmarkPosts: action.payload };
    case "REMOVE_BOOKMARK_POSTS":
      const filteredPosts = state.bookmarkPosts.filter(({_id})=>_id!==action.payload)
      return { ...state, bookmarkPosts: filteredPosts };
    default:
      return state;
  }
};

export default function UserProvider({ children }) {
  const initialState = {
    users: [],
    followUser: [],
    userPosts: [],
    bookmarkPosts: [],
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  const [user, setUser] = useState(null);
  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: "GET_USERS", payload: data.users });
        console.log(data.users);

        // const filteredUsers = data.users.filter(({ _id }) => _id !== user?._id);
        // console.log(filteredUsers);
        // setSuggestedUsers(filteredUsers);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const followUsers = async (followId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/follow/${followId}`, {
        method: "POST",
        headers: { authorization: `bearer${token}` },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: "FOLLOW_USER", payload: data.user.following });
        setUser(data.user);
        // setSuggestedUsers(suggestedUsers.filter(({ _id }) => _id !== followId));
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    followUsers();
  }, []);

  const addBookmarkPosts = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: `bearer${token}` },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      dispatch({ type: "ADD_BOOKMARK_POSTS", payload: data.bookmarks });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    addBookmarkPosts();
  }, []);

  const removeBookmarkPosts = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/remove-bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: `bearer${token}` },
      });
      console.log(response)
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: "REMOVE_BOOKMARK_POSTS", payload: postId});
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.log(state.bookmarkPosts)

  useEffect(() => {
    removeBookmarkPosts();
  }, []);
  console.log(state.bookmarkPosts);

  return (
    <UserContext.Provider
      value={{
        getAllUsers,
        followUsers,
        user,
        state,
        dispatch,
        addBookmarkPosts,
        removeBookmarkPosts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
