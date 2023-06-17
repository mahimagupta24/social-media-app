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
    default:
      return state;
  }
};
export default function UserProvider({ children }) {
  const initialState = {
    users: [],
    followUser: [],
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { user } = useContext(AuthContext);
  console.log(user);
  // const [suggestedUsers, setSuggestedUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
      });
      console.log(response)
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
        // setSuggestedUsers(suggestedUsers.filter(({ _id }) => _id !== followId));
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    followUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ state, getAllUsers, followUsers}}
    >
      {children}
    </UserContext.Provider>
  );
}
