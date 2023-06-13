import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Signup() {
    const {signupHandler}=useContext(AuthContext)
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onSubmitHandler = (e)=>{
    e.preventDefault()
    signupHandler(signupDetails)
  }
  return (
    <div>
       <h1> Signup</h1>
      <form onSubmit={onSubmitHandler}>
        <label>First name</label>
        <input
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, firstName: e.target.value })
          }
        />
        <label>Last name</label>
        <input
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, lastName: e.target.value })
          }
        />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, password: e.target.value })
          }
        />
        <button onClick={signupHandler(signupDetails)}>Create account</button>
        <p>Already have an account?<span>Login</span></p>
      </form>
    </div>
  );
}
