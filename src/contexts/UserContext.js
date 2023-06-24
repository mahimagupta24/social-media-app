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
      return { ...state, users: action.payload };
   case"ADD_BOOKMARK_POSTS":
   return {...state,bookmarks:action.payload}
    default:
      return state;
  }
};

export default function UserProvider({ children }) {
  const initialState = {
    users: [],
    bookmarks:[]
   
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

   const {user, setUser} = useContext(AuthContext);
   

  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
      });
      // console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: "GET_USERS", payload: data.users });
        // console.log(data.users);

        
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
        body: JSON.stringify({}),
      });
      // console.log(response)
      if (response.status === 200) {
        const data = await response.json();
         console.log(data);
          // dispatch({ type: "GET_USERS", payload: data.users.following });
         setUser((user=>({...user,following:data.user.following})))
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
        headers: { authorization: token },
        body: JSON.stringify({}),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
       dispatch({ type: "ADD_BOOKMARK_POSTS", payload: data.bookmarks });
      setUser(user=>({...user,bookmarks:data.bookmarks}))
       
     
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
        headers: { authorization: token },
        body: JSON.stringify({}),
      });
      console.log(response)
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        // dispatch({ type: "REMOVE_BOOKMARK_POSTS", payload:data.bookmarks});
        setUser(user=>({...user,bookmarks:data.bookmarks}))
       }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    removeBookmarkPosts();
  }, []);

  return (
    <UserContext.Provider
      value={{
        getAllUsers,
        followUsers,
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
