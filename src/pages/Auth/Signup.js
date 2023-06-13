import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Signup() {
  const { signupHandler } = useContext(AuthContext);
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();  
    signupHandler(signupDetails);
    setSignupDetails({firstName: "",
    lastName: "",
    userName: "",
    password: "",})
  };
  return (
    <div>
      <h1> Signup</h1>
      <form onSubmit={onSubmitHandler}>
        <label>First name</label>
        <input
          value={signupDetails.firstName}
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, firstName: e.target.value })
          }
          required
        />
        <label>Last name</label>
        <input
          value={signupDetails.lastName}
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, lastName: e.target.value })
          }
          required
        />
        <label>Email</label>
        <input
          value={signupDetails.email}

          type="email"
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, userName: e.target.value })
          }
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={signupDetails.password}
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, password: e.target.value })
          }
          required
        />
        <button type="submit" onClick={()=>signupHandler(signupDetails)}>Create account</button>
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
