import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useNavigate } from "react-router-dom";
import "./Post.css";

function Post({ post, likeAPost, likedPosts }) {
  let navigate = useNavigate();

  return (
    <div className="individual-post">
      <div className="header">
        <h3 className="title">{post.title}</h3>
      </div>
      <div
        className="body"
        onClick={() => {
          navigate(`/post/${post.id}`);
        }}
      >
        {post.postText}
      </div>
      <div className="footer">
        <div className="footer-username me-auto">
          <p className="username">{post.username}</p>
        </div>
        <div className="footer-likes ms-auto">
          {likedPosts.includes(post.id) ? (
            <ThumbUpAltIcon onClick={() => likeAPost(post.id)} />
          ) : (
            <ThumbUpOffAltIcon onClick={() => likeAPost(post.id)} />
          )}

          <label>{post.Likes.length}</label>
        </div>
      </div>
    </div>
  );
}

export default Post;
