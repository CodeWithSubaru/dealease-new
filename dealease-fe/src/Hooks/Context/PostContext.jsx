import { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../../api/axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState({});

  function fetchPost() {
    axiosClient.get('/seller/post').then((resp) => {
      setPosts(resp.data);
    });
  }

  function fetchPublicPosts() {
    axiosClient.get('/public/post').then((resp) => {
      setPosts(resp.data);
    });
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        fetchPost,
        fetchPublicPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default function usePostContext() {
  return useContext(PostContext);
}
