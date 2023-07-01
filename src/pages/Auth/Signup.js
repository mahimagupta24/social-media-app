import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Signup() {
  const { signupHandler } = useContext(AuthContext);
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    signupHandler(signupDetails);
    setSignupDetails({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
  
  };
  return (
    <div className="signUp-main">
      <div className="signUp-container">
        <div>
          <h1 className="signUp-heading"> Signup</h1>
        </div>
        <form className="details" onSubmit={onSubmitHandler}>
          <div className="email">
            <label>Email</label>
            <input
              placeholder="email"
              value={signupDetails.username}
              type="text"
              onChange={(e) =>
                setSignupDetails({ ...signupDetails, username: e.target.value })
              }
              required
            />
          </div>
          <div className="password">
            <label>Password</label>
            <input
              type="password"
              placeholder="*******"
              value={signupDetails.password}
              onChange={(e) =>
                setSignupDetails({ ...signupDetails, password: e.target.value })
              }
              required
            />
          </div>
          <div className="fName">
            <label>First name</label>
            <input
              value={signupDetails.firstName}
              placeholder="first name"
              onChange={(e) =>
                setSignupDetails({
                  ...signupDetails,
                  firstName: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="lName">
            <label>Last name</label>
            <input
              placeholder="last name"
              value={signupDetails.lastName}
              onChange={(e) =>
                setSignupDetails({ ...signupDetails, lastName: e.target.value })
              }
              required
            />
          </div>
          <button
            className="account-btn"
            type="submit"
            // onClick={() => signupHandler(signupDetails)}
          >
            Create account
          </button>
          <p>
            Already have an account?<Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
