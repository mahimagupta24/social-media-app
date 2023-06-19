import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";

export const FeatureContext = createContext();

export default function FeatureProvider({children}){
    const navigate = useNavigate();
    const[posts,setPosts] =useState([])

    const fetchAllPosts = async () => {
        try {
          const response = await fetch("/api/posts", {
            method: "GET",
          });
          console.log(response)
          if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            setPosts(data.posts);
            
          }
        } catch (e) {
          console.error(e);
        }
      };
    
      useEffect(() => {
        fetchAllPosts();
      }, []);
    
      const onUsernameClickHandler = (name) => {
        navigate(`/profile/${name}`);
      };
    
     
// const getLikedPosts = async(postId)=>{
//     try{
//        const response = await fetch(`/api/posts/like/${postId}`,{
//         method: "POST",
//         headers: { authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhOWNmODY4MC1lNjI2LTRhZWMtYmI5Ny00MDI3NjQxNjI2NjQiLCJ1c2VybmFtZSI6ImFkYXJzaGJhbGlrYSJ9.XH44agAmIZQZSZ2gHSeQjoVcY8r_tj63jF9VNTIJ3VE"
//      },

//       } );
//        console.log(response)
//        const data =await response.json()
//        setPosts(data.posts)
//        console.log(data.posts)
//     }catch(e){
//         console.error(e)
//     }
// }
// useEffect(()=>{
//     getLikedPosts()
// },[])
// const getUnLikedPosts = async(postId)=>{
//     const token = localStorage.getItem("token")
//     try{
//        const response = await fetch(`/api/posts/dislike/${postId}`,{
//         method: "POST",
//         headers: { authorization: `bearer${token}`
//      },

//       } );
//         if(response.status===200){
//     //    console.log(response)
//        const data =await response.json()
//        setPosts(data.posts)
//        console.log(data.posts)
//     }}catch(e){
//         console.error(e)
//     }
// }
// useEffect(()=>{
//     getUnLikedPosts()
// },[])

    return <FeatureContext.Provider value={{posts,setPosts,onUsernameClickHandler}}>{children}</FeatureContext.Provider>
}
