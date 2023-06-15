import { useEffect, useState } from "react";

export default function Home() {
  const [newPost, setNewPost] = useState("");
  const getNewPost = async () => {
     const token = localStorage.getItem("token");
     console.log(token)
    try {
      const response = await fetch("/api/user/posts/", {
        method: "POST",
         headers: { authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhOWNmODY4MC1lNjI2LTRhZWMtYmI5Ny00MDI3NjQxNjI2NjQiLCJ1c2VybmFtZSI6ImFkYXJzaGJhbGlrYSJ9.XH44agAmIZQZSZ2gHSeQjoVcY8r_tj63jF9VNTIJ3VE"
         
    
      },
        body: JSON.stringify({newPost}),
       } );
      console.log(response);
      const data = await response.json();
      console.log(data);
      setNewPost("");
    } catch (e) {
      console.error(e);
    }
  };
useEffect(()=>{
    getNewPost()
},[])
  return (
    <div>
       <input value={newPost}onChange={(e) => setNewPost(e.target.value)}/>
      <button onClick={getNewPost}></button> 
    </div>
  );
}
