import React from "react";
import { useNavigate } from "react-router-dom";
import './Post.css';

function Post({ post }) {
  let navigate = useNavigate();

  return (
    <div
      className="individual-post"
      onClick={() => {
        navigate(`/post/${post.id}`);
      }}
    >
      <h3 className="title">{post.title}</h3>
      <div className="body">{post.postText}</div>
      <div className="footer">{post.username}</div>
    </div>
  );
}

export default Post;
