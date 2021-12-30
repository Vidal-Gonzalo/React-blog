import React from "react";
import Axios from "axios";
import Post from "../Post/Post";

function PostList({ posts, setPosts, likedPosts, setLikedPosts, fromProfile }) {
  const likeAPost = (postId) => {
    Axios.post(
      "http://localhost:3001/likes",
      { PostId: postId },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            if (response.data.liked) {
              return { ...post, Likes: [...post.Likes, 0] };
            } else {
              const likesArray = post.Likes;
              likesArray.pop();
              return { ...post, Likes: likesArray };
            }
          } else {
            return post;
          }
        })
      );

      if (likedPosts.includes(postId)) {
        setLikedPosts(
          likedPosts.filter((id) => {
            return id !== postId;
          })
        );
      } else {
        setLikedPosts([...likedPosts, postId]);
      }
    });
  };

  return (
    <div className="post-list">
      {posts.map((element) => {
        return (
          <div key={element.id}>
            <Post
              post={element}
              likeAPost={likeAPost}
              likedPosts={likedPosts}
              fromProfile={fromProfile}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
