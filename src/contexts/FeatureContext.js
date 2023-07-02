import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const FeatureContext = createContext();

export default function FeatureProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editingPost,setEditingPost] = useState(null)
  const [likedPosts, setLikedPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "GET",
      });
      // console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const addNewPost = async (postText) => {
    const postData = {
      content: postText,
      profilePic: user.profilePic,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/posts/", {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify({ postData }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log(data);

         setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };


  const deletePosts = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { authorization: token },
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        toast.success("post deleted")
        console.log(data);
        setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const EditPost = async (postId,editText,editPic) => {
    const postData={
      content:editText,
      mediaUrl:editPic
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify({ postData }),
      });

      const data = await response.json();
      setPosts(data.posts)

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserPosts = async (username) => {
    try {
      const response = await fetch(`/api/posts/user/${username}`);
      // console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        setUserPosts(data.posts)
         setPosts(data.posts);
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  };
  // useEffect(() => {
  //   getUserPosts();
  // }, []);

  const getLikedPosts = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify({}),
      });
      // console.log(response);
      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        

        // console.log(data.posts);
        setPosts(data.posts);
      }
      //  console.log(likedPosts)
    } catch (e) {
      console.error(e);
    }
  };
 
  const getUnLikedPosts = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/posts/dislike/${postId}`, {
        method: "POST",
        headers: { authorization: `bearer${token}` },
        body: JSON.stringify({}),
      });
      if (response.status === 200 || response.status === 201) {
        //    console.log(response)
        const data = await response.json();
        setPosts(data.posts);
        // console.log(data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };
  // useEffect(() => {
  //   getUnLikedPosts();
  // }, []);

  return (
    <FeatureContext.Provider
      value={{
        posts,
        setPosts,
        userPosts,
        setUserPosts,
        getUserPosts,
        setNewPost,
        getLikedPosts,
        getUnLikedPosts,
        likedPosts,
        addNewPost,
        newPost,
        deletePosts,
        editingPost,setEditingPost,EditPost
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
}
