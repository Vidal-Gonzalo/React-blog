import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import Axios from "axios";
import PostList from "../../components/PostList/PostList";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
      //Tengo que hacer una ruta protegida este enfoque no funciona
    } else {
      try {
        setLoading(true);
        Axios.get("http://localhost:3001/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
          .then((response) => {
            setPosts(response.data.postsList);
            setLikedPosts(
              response.data.likedPosts.map((like) => {
                return like.PostId;
              })
            );
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err) {
        console.log("error");
      }
    }
  }, [authState]);

  console.log(authState.status);

  return (
    <section className="home">
      {!loading ? (
        <PostList
          posts={posts}
          setPosts={setPosts}
          likedPosts={likedPosts}
          setLikedPosts={setLikedPosts}
        /> //Proximamente lo voy a poner en context//
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Home;
