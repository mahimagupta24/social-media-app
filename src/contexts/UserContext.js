import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext();
export default function UserProvider({ children }) {
    const[users,setUsers]=useState([])
  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
      });
    if(response.status===200){
        const data = await response.json()
        setUsers(data.users)
    }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return <UserContext.Provider value={{users,getAllUsers}}>{children}</UserContext.Provider>;
}
