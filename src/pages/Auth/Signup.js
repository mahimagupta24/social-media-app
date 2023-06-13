import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Signup() {
  const { signupHandler } = useContext(AuthContext);
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    signupHandler(signupDetails);
    setSignupDetails({firstName: "",
    lastName: "",
    email: "",
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
        />
        <label>Last name</label>
        <input
          value={signupDetails.lastName}
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, lastName: e.target.value })
          }
        />
        <label>Email</label>
        <input
          value={signupDetails.email}

          type="email"
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="password"
          value={signupDetails.password}
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, password: e.target.value })
          }
        />
        <button type="submit" onClick={()=>signupHandler(signupDetails)}>Create account</button>
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
