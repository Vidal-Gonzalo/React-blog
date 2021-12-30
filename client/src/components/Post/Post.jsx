import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";

function Post({ post, likeAPost, likedPosts, fromProfile }) {
  let navigate = useNavigate();

  const goToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

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
          <Link className="username" to={`/profile/${post.UserId}`}>
            {post.username}
          </Link>
        </div>
        <div className="footer-likes ms-auto">
          {!fromProfile ? (
            <>
              {likedPosts.includes(post.id) ? (
                <ThumbUpAltIcon onClick={() => likeAPost(post.id)} />
              ) : (
                <ThumbUpOffAltIcon onClick={() => likeAPost(post.id)} />
              )}

              <label>{post.Likes.length}</label>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Post;
