import { useState } from "react";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({});
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, email: e.target.value })
          }
        />
        <label>Paasword</label>
        <input
          type="password"
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
        />
        <button>Login</button>
        <p>Don't have an account?<span>Signup</span></p>
      </form>
    </div>
  );
}
