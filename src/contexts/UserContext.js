import { useReducer, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext();
const userReducer = (state,action)=>{
  switch (action.type){
case "GET_USERS":
return {...state,users:action.payload}
case "FOLLOW_USER":
  return{...state,followUser:action.payload}
default:
  return state
  }
}
export default function UserProvider({ children }) {
  const initialState = {
    users:[],
    followUser:[]
   }
   const[state,dispatch]= useReducer(userReducer,initialState)
  
  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
      });
    if(response.status===200){
        const data = await response.json()
        dispatch({type:"GET_USERS",payload:data.users})    
    }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const followUsers = async (followId) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`/api/users/follow/${followId}`, {
        method: "POST",
        headers:{authorization:`bearer${token}`}
      });
    if(response.status===200){
        const data = await response.json()
        console.log(data)
        dispatch({type:"FOLLOW_USER",payload:data.user.following}) 
    }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    followUsers();
  }, []);

  return <UserContext.Provider value={{state,getAllUsers,followUsers}}>{children}</UserContext.Provider>;
}
