import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import PostDetail from "../../components/PostDetail/PostDetail";
import Loader from "../../components/Loader/Loader";

function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    postText: "",
    username: "",
    id: 0,
  });
  const [comments, setComments] = useState({
    commentBody: "",
    username: "",
    id: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      Axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
        setPost(response.data);
      });

      Axios.get(`http://localhost:3001/comments/${id}`)
        .then((response) => {
          setComments(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setError(true);
    }
  }, [id]);

  return (
    <div className="post-detail mt-5">
      {error ? <p>Ha habido un error</p> : null}
      {post.title !== "" || !loading ? (
        <PostDetail post={post} comments={comments} newComments={setComments} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default DetailPage;
