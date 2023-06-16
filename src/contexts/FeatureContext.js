import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const FeatureContext = createContext();

export default function FeatureProvider({children}){
    const[posts,setPosts] =useState([])

const getLikedPosts = async(postId)=>{
    try{
       const response = await fetch(`/api/posts/like/${postId}`,{
        method: "POST",
        headers: { authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhOWNmODY4MC1lNjI2LTRhZWMtYmI5Ny00MDI3NjQxNjI2NjQiLCJ1c2VybmFtZSI6ImFkYXJzaGJhbGlrYSJ9.XH44agAmIZQZSZ2gHSeQjoVcY8r_tj63jF9VNTIJ3VE"
     },

      } );
       console.log(response)
       const data =await response.json()
       setPosts(data.posts)
       console.log(data.posts)
    }catch(e){
        console.error(e)
    }
}
useEffect(()=>{
    getLikedPosts()
},[])
const getUnLikedPosts = async(postId)=>{
    try{
       const response = await fetch(`/api/posts/dislike/${postId}`,{
        method: "POST",
        headers: { authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhOWNmODY4MC1lNjI2LTRhZWMtYmI5Ny00MDI3NjQxNjI2NjQiLCJ1c2VybmFtZSI6ImFkYXJzaGJhbGlrYSJ9.XH44agAmIZQZSZ2gHSeQjoVcY8r_tj63jF9VNTIJ3VE"
     },

      } );
        if(response.status===200){
    //    console.log(response)
       const data =await response.json()
       setPosts(data.posts)
       console.log(data.posts)
    }}catch(e){
        console.error(e)
    }
}
useEffect(()=>{
    getUnLikedPosts()
},[])

    return <FeatureContext.Provider value={{posts,getLikedPosts,getUnLikedPosts}}>{children}</FeatureContext.Provider>
}
