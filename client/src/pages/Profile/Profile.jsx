import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostList from "../../components/PostList/PostList";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    try {
      Axios.get(`http://localhost:3001/auth/profileinfo/${id}`).then(
        (response) => {
          setUsername(response.data.username);
        }
      );

      Axios.get(`http://localhost:3001/posts/byUserId/${id}`).then(
        (response) => {
          setPosts(response.data);
        }
      );

      Axios.get("http://localhost:3001/posts", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        setLikedPosts(
          response.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="profile-page-container">
      <div className="profile-info">
        <ProfileCard username={username} />
      </div>
      <div className="profile-posts">
        <PostList
          posts={posts}
          setPosts={setPosts}
          likedPosts={likedPosts}
          setLikedPosts={setLikedPosts}
          fromProfile={true}
        />
      </div>
    </div>
  );
}

export default Profile;
