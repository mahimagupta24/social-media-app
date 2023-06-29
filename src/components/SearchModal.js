import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";

export function SearchModal({searchText}) {
    const navigate= useNavigate()
  const { suggestedUsers} = useContext(UserContext);

  const filteredUsers = suggestedUsers.filter(({ username }) =>
    username?.toLowerCase().includes(searchText?.toLowerCase())
  );
  console.log(filteredUsers);
  return (

   <div className="search-modal-main">
        {filteredUsers.map(({ profilePic, username }) => (
          <div>
            <img className="profile-pic" src={profilePic} alt="username"onClick={()=>navigate(`/profile/${username}`)} style={{cursor:"pointer"}}/>
            <span onClick={()=>navigate(`/profile/${username}`)} style={{cursor:"pointer"}}>@{username}</span>
          </div>
        ))}
    
    </div>
  );
}
