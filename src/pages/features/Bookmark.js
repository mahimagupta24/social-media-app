import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Bookmark() {
  const { state } = useContext(UserContext);
   console.log(state.bookmarks);

  return (
    <div>
      {state?.bookmarks?.map(({ _id, firstName, lastName, content }) => (
        <li key={_id}>
          <p>
            {firstName} {lastName}
          </p>
          <p>{content}</p>
        </li>
      ))}
    </div>
  );
}
