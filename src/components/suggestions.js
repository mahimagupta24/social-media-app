import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Suggestions() {
  const { state, followUsers,getAllUsers  } = useContext(UserContext);
  const {user} = useContext(AuthContext)
const suggestedUsers = state?.users?.filter(({_id})=>_id!==user._id)
console.log(suggestedUsers)

  const handleFollow = (id) => {
    followUsers(id);
    const updatedUsers = suggestedUsers.filter(({_id})=>_id!==id)
    state.users = updatedUsers
    console.log(updatedUsers)
  };
  return (
    <div>
      <h1>Suggested users</h1>
      {suggestedUsers?.map(({ _id, fullname, username }) => (
        <div key={_id}>
          <li>{fullname}</li>
          <li>@{username}</li>
          <li>
            {" "}
            <button onClick={() => handleFollow(_id)}>Follow</button>
          </li>
        </div>
      ))}
    </div>
  );
}
