import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Suggestions() {
  const { users } = useContext(UserContext);
  console.log(users);
  const { user } = useContext(AuthContext);
  console.log(user);
  const suggetsedUsers = users.filter(({ _id }) => _id !== (user && user._id));
  console.log(suggetsedUsers);
  return (
    <div>
      <h1>Suggested users</h1>
      {suggetsedUsers.map(({ _id, fullname, username }) => (
        <li key={_id}>
          <p>{fullname}</p>
          <p>@{username}</p>
        </li>
      ))}
    </div>
  );
}
