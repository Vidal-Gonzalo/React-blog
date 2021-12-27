import React from "react";
import Post from "../Post/Post";

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((element) => {
        return (
          <div key={element.id}>
            <Post post={element} />
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
