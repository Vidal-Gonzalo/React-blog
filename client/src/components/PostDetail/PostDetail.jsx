import React, { useContext, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./PostDetail.css";
import { AuthContext } from "../../context/Auth";

function PostDetail({ post, comments, setComments }) {
  const [newComment, setNewComment] = useState("");
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const { id } = useParams();

  const deletePost = (id) => {
    Axios.delete(`http://localhost:3001/posts/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    navigate("/");
  };

  const addComment = () => {
    Axios.post(
      "http://localhost:3001/comments",
      {
        commentBody: newComment,
        PostId: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      console.log(response);
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log(response);
        const commentToAdd = {
          commentBody: newComment,
          username: response.data.username,
          id: comments.id,
        };
        setComments([...comments, commentToAdd]);
      }
    });
    setNewComment("");
  };

  const deleteComment = (id) => {
    Axios.delete(`http://localhost:3001/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then(() => {
      setComments(
        comments.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="container">
      <div className="wrap">
        <div className="row">
          <div className="col-6">
            <div className="detail-card">
              <h3 className="detail-card-title">{post.title}</h3>
              <p className="detail-card-body">{post.postText}</p>
              <p className="detail-card-footer">
                {post.username} <br />
                {authState.username === post.username && (
                  <button
                    className="btn btn-danger btn-sm"
                    type="submit"
                    onClick={() => deletePost(post.id)}
                  >
                    Eliminar artículo
                  </button>
                )}
              </p>
            </div>
          </div>
          <div className="col-6">
            <div className="comment-section">
              <div className="add-comment-container">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Escriba su comentario"
                    id="floatingTextarea"
                    value={newComment}
                    onChange={(event) => {
                      setNewComment(event.target.value);
                    }}
                  ></textarea>
                  <label htmlFor="floatingTextarea">
                    Escriba su comentario
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  onClick={() => {
                    addComment();
                  }}
                >
                  Enviar comentario
                </button>
              </div>
              <div className="list-of-comments">
                <h3 className="mt-5">Comentarios</h3>
                {comments.commentBody !== "" ? (
                  comments.map((element, index) => {
                    return (
                      <div key={index} className="comments">
                        {element.commentBody}
                        <label>
                          Nombre de usuario: <strong>{element.username}</strong>
                        </label>
                        {authState.username === element.username ? (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deleteComment(element.id);
                            }}
                          >
                            X
                          </button>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <p>Cargando...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
