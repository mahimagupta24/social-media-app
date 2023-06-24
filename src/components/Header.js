import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
const{setSearchText}=useContext(UserContext)

  return (
    <div>   
    <div className="header">
    <h2 className="heading">Friendify</h2>
      <div className="search-container">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 16C9.77498 15.9996 11.4988 15.4054 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.405 11.4997 15.9996 9.77544 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z"
            fill="#666666"
          />
        </svg>
        <input placeholder="search" className="search-bar"onChange={(e)=>setSearchText(e.target.value)} />
      </div>
    </div></div>
  );
}
