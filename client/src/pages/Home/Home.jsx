import React, { useEffect, useState } from "react";
import "./Home.css";
import Axios from "axios";
import PostList from "../../components/PostList/PostList";
import Loader from "../../components/Loader/Loader";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      Axios.get("http://localhost:3001/posts")
        .then((response) => {
          setPosts(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log("error");
    }
  }, []);

  return (
    <section className="home">
      {!loading ? <PostList posts={posts} /> : <Loader />}
    </section>
  );
}

export default Home;
