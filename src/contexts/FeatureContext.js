import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";

export const FeatureContext = createContext();

export default function FeatureProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [likedPosts,setLikedPosts] = useState([])

  const fetchAllPosts = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "GET",
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // const addNewPost = async()=>{
  //   const token = localStorage.getItem("token")
  //   try{
  //    const response = await fetch("/api/posts/",{
  //     method:"POST",
  //     headers:{authorization:token},
  //     body:JSON.stringify({postData:newPost})
  //    })

  //    if(response.status===201){
  //     const data = await response.json()
  //       // setUserPosts(...userPosts,data.posts)
  //       // console.log("userPosts",userPosts)
  //     //  setPosts([...userPosts,newPost])
  //    }
  //   }catch(e){
  //     console.error(e)
  //   }
  // }
  // useEffect(()=>{
  //   addNewPost()
  // },[])

  const getUserPosts = async (username) => {
    try {
      const response = await fetch(`/api/posts/user/${username}`);
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        setUserPosts(data.posts);
        console.log(data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  const getLikedPosts = async(postId)=>{
    const token = localStorage.getItem("token")
      try{
         const response = await fetch(`/api/posts/like/${postId}`,{
          method: "POST",
          headers: { authorization: token
       },

        } );
        console.log(response)
         const data =await response.json()
         console.log(data)
         setLikedPosts(data.posts)
        //  console.log(likedPosts)
      }catch(e){
          console.error(e)
      }
  }
  useEffect(()=>{
      getLikedPosts()
  },[])

  const getUnLikedPosts = async(postId)=>{
      const token = localStorage.getItem("token")
      try{
         const response = await fetch(`/api/posts/dislike/${postId}`,{
          method: "POST",
          headers: { authorization: `bearer${token}`
       },

        } );
          if(response.status===200){
      //    console.log(response)
         const data =await response.json()
         setLikedPosts(data.posts)
         console.log(data.posts)
      }}catch(e){
          console.error(e)
      }
  }
  useEffect(()=>{
      getUnLikedPosts()
  },[])

  

  return (
    <FeatureContext.Provider
      value={{
        posts,
        setPosts,
        userPosts,
        getUserPosts,
        setNewPost,
        getLikedPosts,
        getUnLikedPosts,
        likedPosts
        // addNewPost,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
}
