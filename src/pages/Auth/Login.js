import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { loginHandler } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
   
  };
  const fixedLoginDetails = {
    username: "adarshbalika",
    password: "adarshBalika123",
  };

  const guestLoginHandler = () => {
    setLoginDetails({
      username: fixedLoginDetails.username,
      password: fixedLoginDetails.password,
    });
    console.log(fixedLoginDetails.username)
    loginHandler(loginDetails);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onLoginSubmitHandler}>
        <label>Email</label>
        <input
          value={loginDetails.username}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, username: e.target.value })
          }
          required
        />
        <label>Password</label>
        <input
          value={loginDetails.password}
          type="password"
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
          required
        />
        <button type="submit">Login</button>
        <button onClick={guestLoginHandler}>Guest login</button>
        <p>
          Don't have an account?<Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
