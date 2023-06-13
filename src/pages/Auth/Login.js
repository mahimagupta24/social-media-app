import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { loginHandler } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    loginHandler(loginDetails);
    setLoginDetails({ email: "", password: "" });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onLoginSubmitHandler}>
        <label>Email</label>
        <input
          value={loginDetails.email}
          type="email"
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, email: e.target.value })
          }
        />
        <label>Paasword</label>
        <input
          value={loginDetails.password}
          type="password"
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
        />
        <button type="submit" onClick={() => loginHandler(loginDetails)}>
          Login
        </button>
        <p>
          Don't have an account?<Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
