import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AuthContext } from "../contexts/AuthContext";
import "./components.css"
export default function Suggestions() {
  const { state, followUsers,getAllUsers  } = useContext(UserContext);
  const {user} = useContext(AuthContext)

  

const suggestedUsers = state?.users?.filter(({_id})=>_id!==user._id)
console.log(suggestedUsers)

   const handleFollow = (id) => {
     followUsers(id);
   const updatedUsers = suggestedUsers.filter(({_id})=>_id!==id)
   state.users = updatedUsers
    console.log(state.users)
   };
  return (
    <div className="suggestion-container">
      <h1>Suggested users</h1>
      {suggestedUsers?.map(({ _id, fullname, username ,profilePic}) => (
        <div className="suggestion-list"key={_id}>
          <img className="profile-pic"src={profilePic}/>
          <div className="suggested-user-details">
          <span><b>{fullname}</b></span>
          <span>@{username}</span>
          </div>
            <button onClick={() => handleFollow(_id)}>Follow</button>
            <hr/>
            </div>
          
        
        
      ))}
    </div>
  );
}
