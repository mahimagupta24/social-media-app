import { createContext, useReducer, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

const initialState = { encodedToken: "" };

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { ...state, encodedToken: action.payload };
  }
};
export default function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signupHandler = async ({ firstName, lastName, userName, password }) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, userName, password }),
      });
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        const token = data.encodedToken;

        dispatch({ type: "AUTH_SUCCESS", payload: token });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const loginHandler = async ({ username, password }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        const token = data.encodedToken;
        console.log(token)
        localStorage.setItem("token", token);
        
        console.log(data.foundUser);
        dispatch({ type: "AUTH_SUCCESS", payload: token });
        setUser(data.foundUser);
        console.log(user)
        navigate("/")
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ signupHandler, loginHandler, user }}>
      {children}
    </AuthContext.Provider>
  );
}
