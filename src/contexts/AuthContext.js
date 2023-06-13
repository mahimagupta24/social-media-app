import { createContext, useReducer } from "react";

export const AuthContext = createContext();
const initialState = { encodedToken: "" };

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { ...state, encodedToken: action.payload };
  }
};
export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signupHandler=async({firstName,lastName,email,password})=>{
    try{
       const response =await fetch("/api/auth/signup",{
        method:"POST",
        body:JSON.stringify({firstName,lastName,email,password})
       })
       if(response.status===201){
        const data= await response.json()
        console.log(data)
        const token = data.encodedToken
        localStorage.setItem("token",token)
        dispatch({type:"AUTH_SUCCESS",payload:token})
       }
    }
    catch(e){
        console.error(e)
    }
  }
  const loginHandler=async({email,password})=>{
    try{
       const response =await fetch("/api/auth/login",{
        method:"POST",
        body:JSON.stringify({email,password})
       })
    //    if(response.status===201){
        const data= await response.json()
        console.log(data)
        const token = data.encodedToken
        dispatch({type:"AUTH_SUCCESS",payload:token})
       }
    // }
    catch(e){
        console.error(e)
    }
  }

  return <AuthContext.Provider value={{signupHandler,loginHandler}}>{children}</AuthContext.Provider>;
}
