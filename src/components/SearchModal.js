import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function SearchModal({searchText}) {
  const { suggestedUsers} = useContext(UserContext);

  const filteredUsers = suggestedUsers.filter(({ username }) =>
    username?.toLowerCase().includes(searchText?.toLowerCase())
  );
  console.log(filteredUsers);
  return (
   <div>
      
        {filteredUsers.map(({ profilePic, username }) => (
          <div>
            <img className="profile-pic" src={profilePic} alt="username"/>
            <span>@{username}</span>
          </div>
        ))}
    
    </div>
  );
}
