import { useState } from "react";

export default function Signup() {
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return <div>
    <form>
        <label>First name</label>
        <input onChange={(e)=>setSignupDetails({...signupDetails,firstName:e.target.value})}/>
        <label>Last name</label>
        <input onChange={(e)=>setSignupDetails({...signupDetails,lastName:e.target.value})}/>
        <label>Email</label>
        <input type="email"onChange={(e)=>setSignupDetails({...signupDetails,email:e.target.value})}/>
        <label>Password</label>
        <input type="password"onChange={(e)=>setSignupDetails({...signupDetails,password:e.target.value})}/>

    </form>
  </div>;
}
